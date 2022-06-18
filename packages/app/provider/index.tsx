import { NavigationProvider } from './navigation'
import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { focusManager, QueryClientProvider, QueryClient } from 'react-query'
import theme from '../theme'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik'
import { Platform, Text } from 'react-native'
import { AuthProvider } from './auth'
import { CryptoSpaceProvider } from 'app/context/crypto-context'

import { LogBox } from 'react-native'
import { NetworkStatusProvider } from './network'

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

  const isWEB = Platform.OS === 'web'

  // React Query already supports in web browser refetch on window focus by default
  if (!isWEB) {
    focusManager.setFocused(true)
  }

  if (!fonts && Platform.OS !== 'web') {
    return <Text>Loading ...</Text>
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <NetworkStatusProvider>
        <AuthProvider>
          <NavigationProvider>
            <NativeBaseProvider theme={theme}>
              <CryptoSpaceProvider>{children}</CryptoSpaceProvider>
            </NativeBaseProvider>
          </NavigationProvider>
        </AuthProvider>
      </NetworkStatusProvider>
    </QueryClientProvider>
  )
}
