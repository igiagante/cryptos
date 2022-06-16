import React, { useContext, useEffect, useState } from 'react'
import {
  Center,
  Heading,
  Text,
  Button,
  Box,
  Spinner,
  Flex,
  HStack,
} from 'native-base'
import { AuthContext } from 'app/provider/auth'
import axios, { AxiosResponse } from 'axios'
import { CryptoItem } from 'app/components/CryptoItem'
import { CoinType } from 'app/types/types'
import { createParam } from 'solito'

type CryptoItemType = {
  rank: number
  symbol: string
  imgSrc: string
  price: number
  lastChange: number
}

type HistoricDataType = {
    prices: [[number, number]]
    market_caps: [[number, number]]
    total_volumes: [[number, number]]
}

const { useParam } = createParam()

export function CryptoScreen() {
  const [symbol] = useParam('symbol')
  const { signOut } = useContext(AuthContext)
  const [cryptos, setCryptos] = useState<HistoricDataType>()
  const [isLoading, setIsLoading] = useState(false)

  const instance = axios.create()

  useEffect(() => {
    setIsLoading(true)
    const fetchCrypto = async () => {
      const result = await instance.get<void, AxiosResponse<HistoricDataType>>(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range/${symbol}`,
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_rank',
            from: Math.floor(
              new Date(new Date().getDate() - 7).getTime() / 1000
            ),
            to: Math.floor(new Date('2012.08.10').getTime() / 1000),
          },
        }
      )
      setCryptos(result.data)
    }
    fetchCrypto()
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
      <Box mt="6">
        <Button style={{ borderWidth: 1 }} variant="outline" onPress={signOut}>
          Logout
        </Button>
      </Box>
    </Box>
  )
}
