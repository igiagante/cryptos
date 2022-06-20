import { useContext } from 'react'
import { AuthContext } from 'app/provider/auth'

import { AuthStack } from './AuthStack'
import { AppStack } from './AppStack'


export function NativeNavigation() {
  const { user } = useContext(AuthContext)
  console.log('user', user)
  return user ? <AppStack /> : <AuthStack />
}
