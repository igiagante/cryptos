import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/home'
import { LoginScreen } from '../../features/login/login'
import { useContext } from 'react'
import { AuthContext } from 'app/provider/auth'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
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
          {/* <Stack.Screen
            name="user-detail"
            component={UserDetailScreen}
            options={{
              title: 'User',
            }}
          /> */}
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
