import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { loginInstance, loginApi } from 'app/api'

export type AuthData = {
  userId: string
  token: string
  refreshToken: string
}

export type UserType = {
  email: string
  password: string
}

interface AuthContextData {
  signed: boolean
  user: string | null
  loading: boolean
  signIn: (user: UserType) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@expoAuth:token')

      if (storagedToken) {
        loginInstance.defaults.headers.common.Authorization = `Bearer ${storagedToken}`
        setLoading(false)
      }
    }

    loadStorageData()
  }, [])

  const signIn = async (user: UserType) => {
    try {
      const response = await loginApi.login(user)

      setUser(response.data.userId)
      const { token, refreshToken } = response.data

      loginInstance.defaults.headers['Authorization'] = `Bearer ${token}`

      await AsyncStorage.setItem('@expoAuth:refreshToken', refreshToken)
      await AsyncStorage.setItem('@expoAuth:token', token)
    } catch (error) {
      console.log('error', error)
    }
  }

  const signOut = async () => {
    AsyncStorage.clear().then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth should be inside of the AuthContext provider')
  }
  return context
}
