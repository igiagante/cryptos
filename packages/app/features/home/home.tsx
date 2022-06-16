import React, { useContext, useEffect, useState } from 'react'
import {
  Center,
  Image,
  Heading,
  Text,
  Button,
  AspectRatio,
  Box,
  Spinner,
  ScrollView,
  Flex,
  HStack,
} from 'native-base'
import { AuthContext } from 'app/provider/auth'
import axios, { AxiosResponse } from 'axios'
import { CryptoItem } from 'app/components/CryptoItem'
import { CoinType } from 'app/types/types'
import useGetCryptoList from 'app/hooks'

export function HomeScreen() {
  const { signOut } = useContext(AuthContext)
  const [cryptos, setCryptos] = useState<Array<CoinType>>([])
  const [isLoading, setIsLoading] = useState(false)

  // const [data, getData, isLoading] = useGetCryptoList<CoinType>({
  //   url: 'https://api.coingecko.com/api/v3/coins',
  //   path: 'markets',
  //   params: {
  //     vs_currency: 'usd',
  //     order: 'market_cap_rank',
  //     per_page: 10,
  //     page: 1,
  //   },
  // })

  // useEffect(() => {
  //   if(data) {
  //     getData()
  //     setCryptos(data)
  //   }
  // }, [data])
  

  const instance = axios.create()

  useEffect(() => {
    setIsLoading(true)
    const fetchCryptos = async () => {
      const result = await instance.get<void, AxiosResponse<CoinType[]>>(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_rank',
            per_page: 10,
            page: 1,
          },
        }
      )
      setCryptos(result.data)
    }
    fetchCryptos()
  }, [])

  useEffect(() => {
    if (cryptos) {
      setIsLoading(false)
    }
  }, [cryptos])

  if (isLoading) {
    return <Spinner />
  }

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
        {cryptos &&
          cryptos.map((c) => {
            return (
              <CryptoItem
                key={c.symbol}
                rank={c.market_cap_rank}
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
