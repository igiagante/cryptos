import React, { useContext, useState } from 'react'
import { Box, Button, Center, Input, Stack, Text } from 'native-base'
import { AuthContext, UserType } from 'app/provider/auth'

export function LoginScreen() {
  const [user, setUser] = useState<UserType>({
    email: 'igiagante@gmail.com',
    password: 'axis_test',
  })

  const { signIn } = useContext(AuthContext)
  const handleOnClick = () => {
    signIn(user)
  }

  return (
    <Center flex="1" bg={'bgColor'}>
      <Text fontFamily="rubik" fontSize={32} w={48} textAlign="center">
        Harkonen House
      </Text>
      <Stack mt={32} space={4} w="75%" maxW="300px" mx="auto">
        <Input
          color="white"
          variant="underlined"
          placeholder="Email"
          value={user.email}
          mb={4}
          bg="transparent"
          onChangeText={(email: string) =>
            setUser((prev) => ({
              ...prev,
              email: email,
            }))
          }
        />
        <Input
          color="white"
          variant="underlined"
          placeholder="Password"
          value={user.password}
          mb={4}
          bg="transparent"
          onChangeText={(pass: string) =>
            setUser((prev) => ({
              ...prev,
              password: pass,
            }))
          }
        />
      </Stack>
      <Box mt="6">
        <Button
          variant="outline"
          onPress={handleOnClick}
          fontWeight='bold'
          style={{
            borderColor: 'white',
            borderWidth: 1
          }}
          
        >
          <Text color="white">Login</Text>
        </Button>
      </Box>
    </Center>
  )
}
