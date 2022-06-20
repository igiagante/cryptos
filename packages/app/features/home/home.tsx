import React, { useContext, useEffect } from 'react'
import { Center, Heading, Text, Button, Box, ScrollView, Flex, HStack, Spinner } from 'native-base'
import { AuthContext } from 'app/provider/auth'
import { CryptoItem } from 'app/components/CryptoItem'
import { useCryptoSpace } from 'app/context/crypto-context'
import { coinGeckoApi } from 'app/api'
import { useRefreshOnFocus } from 'app/hooks'
import { useQuery } from 'react-query'
import { Platform, useWindowDimensions } from 'react-native'
import { CryptoListHeader } from 'app/components/CryptoListHeader'

export function HomeScreen() {
  const { signOut } = useContext(AuthContext)
  const { setCoins, isWeb } = useCryptoSpace()

  const { width } = useWindowDimensions();
  const screenWidth = width || 1280;
  const large = screenWidth > 1280;

  const { data, isLoading, refetch } = useQuery(['coins'], () => coinGeckoApi.getCoins())

  if (!isWeb) {
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
      <CryptoListHeader />
      {isLoading ? (
        <Flex flex={1} align="center" justify="center">
          <Spinner />
        </Flex>
      ) : (
        <ScrollView paddingLeft={isWeb && large ? 256 : 0}
        paddingRight={isWeb && large ? 256 : 0}>
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
                  volume={c.total_volume}
                  marketCap={parseFloat(c.market_cap.toString())}
                />
              )
            })}
        </ScrollView>
      )}
    </Box>
  )
}
