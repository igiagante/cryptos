import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { LoginScreen } from '../../features/login/login'
import { OnboardingScreen } from '../../features/onboarding/onboarding'
import { useFirstLunch } from 'app/hooks'
import { Spinner } from 'native-base'

const Stack = createNativeStackNavigator<{
  login: undefined
  onboarding: undefined
}>()

export function AuthStack() {
  const [isFirstLaunch] = useFirstLunch()

  if (isFirstLaunch === null) return <Spinner />

  return (
    <Stack.Navigator initialRouteName={isFirstLaunch ? 'onboarding' : 'login'}>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: 'Login',
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
