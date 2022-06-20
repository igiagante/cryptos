import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import api from 'app/api/axios'
import auth from 'app/api/index'

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
  isFirstLaunch: boolean | null
  loading: boolean
  signIn: (user: UserType) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)
  

  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@expoAuth:token')

      if (storagedToken) {
        api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`
        setLoading(false)
      }

      const firstLoaded = await AsyncStorage.getItem('firstLoaded')

      if (firstLoaded === null) {
        AsyncStorage.setItem('firstLoaded', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    }

    loadStorageData()
  }, [])

  const signIn = async (user: UserType) => {
    try {
      const response = await auth.login(user)

      setUser(response.data.userId)
      const { token, refreshToken } = response.data

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      await AsyncStorage.setItem('@expoAuth:refreshToken', refreshToken)
      await AsyncStorage.setItem('@expoAuth:token', token)
      setIsFirstLaunch(false)
    } catch (error) {
      console.log('error', error)
    }
  }

  const signOut = async () => {
    setUser(null)
    await AsyncStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, isFirstLaunch, loading, signIn, signOut }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth should be inside of the AuthContext provider')
  }
  return context
}
