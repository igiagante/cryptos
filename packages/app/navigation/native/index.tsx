import { useContext } from 'react'
import { AuthContext } from 'app/provider/auth'

import { AuthStack } from './AuthStack'
import { AppStack } from './AppStack'


export function NativeNavigation() {
  const { user } = useContext(AuthContext)
  return user ? <AppStack /> : <AuthStack />
}
