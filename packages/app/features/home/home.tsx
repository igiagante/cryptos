import React, { useContext } from 'react'
import {
  Center,
  Heading,
  Text,
  Button,
  Box,
  ScrollView,
  Flex,
  HStack,
} from 'native-base'
import { AuthContext } from 'app/provider/auth'
import { CryptoItem } from 'app/components/CryptoItem'
import { useCryptoSpace } from 'app/context/crypto-context'

export function HomeScreen() {
  const { signOut } = useContext(AuthContext)
  const { coins } = useCryptoSpace()

  return (
    <Box bg={'bgColor'} h="100%">
      <Center mt={8} mb={8}>
        <Heading
          color="white"
          fontSize="32px"
          fontFamily="rubik"
          fontWeight={500}
        >
          Trending Cryptos
        </Heading>
      </Center>
      <HStack
        alignItems="center"
        h={16}
        p={4}
        borderRadius="10px"
        shadow={10}
        mx={4}
      >
        <Flex flex={0.5} justifyContent="flex-end">
          <Text textAlign="left">#</Text>
        </Flex>

        <Flex flex={1} justifyContent="flex-end">
          <Text textAlign="left">Coin</Text>
        </Flex>

        <Flex flex={1.2} justifyContent="flex-end">
          <Text textAlign="left">Price</Text>
        </Flex>
        <Flex flex={0.75} justifyContent="flex-end">
          <Text textAlign="left">24 hr</Text>
        </Flex>
      </HStack>
      <ScrollView h="80">
        {coins &&
          coins.map((c) => {
            return (
              <CryptoItem
                key={c.symbol}
                rank={c.market_cap_rank}
                name={c.name}
                symbol={c.symbol}
                imgSrc={c.image}
                price={c.current_price}
                lastChange={c.price_change_percentage_24h}
              />
            )
          })}
      </ScrollView>
      <Box mt="6">
        <Button style={{ borderWidth: 1 }} variant="outline" onPress={signOut}>
          Logout
        </Button>
      </Box>
    </Box>
  )
}
