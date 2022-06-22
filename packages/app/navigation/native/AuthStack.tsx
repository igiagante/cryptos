import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { LoginScreen } from '../../features/login/login'
import { OnboardingScreen } from '../../features/onboarding/onboarding'
import { Spinner } from 'native-base'
import { useContext } from 'react'
import { AuthContext } from 'app/provider/auth'

const Stack = createNativeStackNavigator<{
  login: undefined
  onboarding: undefined
  home: undefined
}>()

export function AuthStack() {
  const { isFirstLaunch } = useContext(AuthContext)

  if (isFirstLaunch === null) return <Spinner />

  return (
    <Stack.Navigator initialRouteName={isFirstLaunch ? 'onboarding' : 'home'}>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          header: undefined,
          headerShadowVisible: false,
          headerBackVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#263038',
          },
        }}
      />
      <Stack.Screen
        name="onboarding"
        component={OnboardingScreen}
        options={{
          header: undefined,
          title: '',
          headerStyle: {
            backgroundColor: '#263038',
          },
        }}
      />
    </Stack.Navigator>
  )
}
