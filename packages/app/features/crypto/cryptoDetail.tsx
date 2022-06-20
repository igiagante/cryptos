import React, { useEffect, useState } from 'react'
import { Center, Heading, Text, Box, Spinner, Divider, Flex, IconButton } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { createParam } from 'solito'
import { useGetCryptoFetch } from 'app/hooks'
import { Chart } from 'app/components'
import { useCryptoSpace } from 'app/context/crypto-context'
import { IndicatorLabel } from 'app/components/IndicatorLabel'
import { MarketInfo } from 'app/components/MarketInfo'
import { useRouter } from 'solito/router'
import { TouchableOpacity } from 'react-native'

export type HistoricDataType = {
  prices: [[number, number]]
  market_caps: [[number, number]]
  total_volumes: [[number, number]]
}

const { useParam } = createParam<{ id: string }>()

export function CryptoScreen() {
  const [id] = useParam('id')
  const { coins } = useCryptoSpace()
  const { back, push } = useRouter()
  const [historicalData, setHistoricalData] = useState<HistoricDataType>()

  const [data, isLoading] = useGetCryptoFetch<HistoricDataType>({
    url: 'https://api.coingecko.com/api/v3/coins',
    path: `/${id}/market_chart/range`,
    params: {
      vs_currency: 'usd',
      order: 'to',
      from: Math.floor(new Date(new Date().getDate() - 7).getTime() / 1000),
      to: Math.floor(new Date().getTime() / 1000),
    },
  })

  useEffect(() => {
    if (data) {
      setHistoricalData(data)
    }
  }, [data])

  if (isLoading) {
    return (
      <Flex flex={1} align="center" justify="center">
        <Spinner />
      </Flex>
    )
  }

  const coin = coins.filter((coin) => coin.id === id)[0]
  const direction = coin && coin?.price_change_24h > 0 ? 'up' : 'down'

  return (
    <>
      <Box bg={'bgColor'} h="100%">
        <IconButton
        w={16}
        h={10}
        size="xs"
        bg="transparent"
        onPress={back}
        top={8}
        left={4}
        _pressed={{
          bg: 'transparent'
        }}
        _icon={{
          as: MaterialIcons,
          name: 'arrow-back-ios',
          color: 'white'
        }}
      />
        <Center mt={8} mb={8}>
          <Heading color="white" fontSize="32px" fontFamily="rubik" fontWeight={500}>
            {coin?.name}
          </Heading>
          <Text fontFamily="rubik" fontSize={48}>
            $ {coin?.current_price}
          </Text>
          <IndicatorLabel
            direction={direction}
            firstValue={coin?.price_change_24h.toFixed(0) || ''}
            secondValue={coin?.market_cap_change_percentage_24h.toFixed(2) || ''}
          />
        </Center>
        <Divider key="first" h={0.25} color="lightgrey" bg="lightgrey" my={2} mb={4} />

        {coin && <MarketInfo coin={coin} totalWeek={-10983} totalWeekPercentage={22} styles={{ marginBottom: 16 }} />}

        <Divider key="second-line" h={0.5} color="lightgrey" bg="lightgrey" mt={2} />

        <Flex position="absolute" bottom={0}>
          <Text fontFamily="roboto" fontWeight={500} fontSize={18} mb={4} ml={3}>
            {coin?.name} to USD Chart
          </Text>
          <Chart data={historicalData} />
        </Flex>
      </Box>
    </>
  )
}
