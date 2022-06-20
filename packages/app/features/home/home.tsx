import React, { useContext, useEffect } from 'react'
import { Center, Heading, Text, Button, Box, ScrollView, Flex, HStack, Spinner } from 'native-base'
import { AuthContext } from 'app/provider/auth'
import { CryptoItem } from 'app/components/CryptoItem'
import { useCryptoSpace } from 'app/context/crypto-context'
import { coinGeckoApi } from 'app/api'
import { useRefreshOnFocus } from 'app/hooks'
import { useQuery } from 'react-query'
import { Platform } from 'react-native'

export function HomeScreen() {
  const { signOut } = useContext(AuthContext)
  const { setCoins } = useCryptoSpace()

  const { data, isLoading, refetch } = useQuery(['coins'], () => coinGeckoApi.getCoins())

  if (Platform.OS !== 'web') {
    useRefreshOnFocus(refetch)
  }

  const coins = data?.data

  useEffect(() => {
    if (!isLoading && data?.data) {
      setCoins(data.data)
    }
  }, [data?.data])

  return (
    <Box bg={'bgColor'} h="100%" position="relative">
      <Button
        w="64px"
        h="28px"
        p={0}
        onPress={signOut}
        fontWeight="bold"
        position="absolute"
        bg="gold"
        top={8}
        right={4}
      >
        <Text color="white" m={0}>
          Logout
        </Text>
      </Button>
      <Center mt={16} mb={8}>
        <Heading color="white" fontSize="32px" fontFamily="rubik" fontWeight={500}>
          Trending Cryptos
        </Heading>
      </Center>
      <HStack alignItems="center" h={16} p={4} borderRadius="10px" shadow={10} mx={4}>
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
      {isLoading ? (
        <Flex flex={1} align="center" justify="center">
          <Spinner />
        </Flex>
      ) : (
        <ScrollView>
          {coins &&
            coins.map((c) => {
              return (
                <CryptoItem
                  key={c.symbol}
                  rank={c.market_cap_rank}
                  id={c.id}
                  name={c.name}
                  symbol={c.symbol}
                  imgSrc={c.image}
                  price={c.current_price}
                  lastChange={c.price_change_percentage_24h}
                />
              )
            })}
        </ScrollView>
      )}
    </Box>
  )
}
