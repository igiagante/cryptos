import React, { useContext, useState } from 'react'
import { Box, Button, Center, Input, Stack, Text } from 'native-base'
import { AuthContext, UserType } from 'app/provider/auth'
import { useRouter } from 'solito/router'

export function LoginScreen() {
  const [user, setUser] = useState<UserType>({
    email: 'igiagante@gmail.com',
    password: 'axis_test',
  })

  const { signIn, user: userId } = useContext(AuthContext)
  const { push } = useRouter()

  const handleOnClick = () => {
    signIn(user)
    // push('/home')
  }

  return (
    <Center flex="1" bg={'bgColor'}>
      <Text fontFamily="rubik" fontSize={32} w={48} textAlign="center">
        Harkonen House
      </Text>
      <Text mt={16} fontSize="xl" textAlign="center">
        Login
      </Text>
      <Stack mt={16} space={4} w="75%" maxW="300px" mx="auto">
        <Input
          color="white"
          variant="underlined"
          placeholder="Email"
          value={user.email}
          mb={4}
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
          colorScheme="coolGray"
          onPress={handleOnClick}
        >
          Login
        </Button>
      </Box>
    </Center>
  )
}
