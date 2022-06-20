import { NavigationProvider } from './navigation'
import React from 'react'
import { NativeBaseProvider } from 'native-base'
import theme from '../theme'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik'
import { Text } from 'react-native'
import { AuthProvider } from './auth'
import { CryptoSpaceProvider } from 'app/context/crypto-context'

import { LogBox } from 'react-native'

LogBox.ignoreLogs(['NativeBase:'])

export function Provider({ children }: { children: React.ReactNode }) {
  const [fonts] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  })

  if (!fonts) {
    return <Text>Loading ...</Text>
  }

  return (
    <AuthProvider>
      <NavigationProvider>
        <NativeBaseProvider theme={theme}>
          <CryptoSpaceProvider>{children}</CryptoSpaceProvider>
        </NativeBaseProvider>
      </NavigationProvider>
    </AuthProvider>
  )
}
