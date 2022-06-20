import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/home'
import { CryptoScreen } from '../../features/crypto/cryptoDetail'

const Stack = createNativeStackNavigator<{
  home: undefined
  cryptoDetail: {
    id: string
  }
}>()

export function AppStack() {
  return (
    <Stack.Navigator initialRouteName={'home'}>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: '',
          header: undefined,
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#263038',
          },
        }}
      />
      <Stack.Screen
        name="cryptoDetail"
        component={CryptoScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#263038',
          },
        }}
      />
    </Stack.Navigator>
  )
}
