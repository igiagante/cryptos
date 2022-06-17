import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/home'
import { LoginScreen } from '../../features/login/login'
import { CryptoScreen } from '../../features/crypto/cryptoDetail'
import { useContext } from 'react'
import { AuthContext } from 'app/provider/auth'

const Stack = createNativeStackNavigator<{
  home: undefined
  'cryptoDetail': {
    id: string
  }
  login: undefined
}>()

export function NativeNavigation() {
  const { user } = useContext(AuthContext)

  return (
    <Stack.Navigator initialRouteName={user ? 'home' : 'login'}>
      {user ? (
        <>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: 'Cryptos',
            }}
          />
          <Stack.Screen
            name="cryptoDetail"
            component={CryptoScreen}
            options={{
              title: 'Crypto Detail',
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
        />
      )}
    </Stack.Navigator>
  )
}
