import React from 'react'
import { Center, Heading, Text, Box, Spinner, Divider, Flex, IconButton } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useQuery } from 'react-query'
import { createParam } from 'solito'
import { Chart } from 'app/components'
import { useCryptoSpace } from 'app/context/crypto-context'
import { IndicatorLabel, MarketInfo } from 'app/components'
import { useRouter } from 'solito/router'
import { coinGeckoApi } from 'app/api'

export type HistoricDataType = {
  prices: [[number, number]]
  market_caps: [[number, number]]
  total_volumes: [[number, number]]
}

const { useParam } = createParam<{ id: string }>()

export function CryptoScreen() {
  const [id] = useParam('id')
  const { coins, isWeb } = useCryptoSpace()
  const { back } = useRouter()

  const { data, isLoading } = useQuery(['coin', id], () => coinGeckoApi.getCoinHistoricData(id || ''))
  const { data: coinDetail } = useQuery(['coinDetail', id], () => coinGeckoApi.getCoinDetail(id || ''), {
    enabled: coins.length === 0
  })

  if (isLoading) {
    return (
      <Flex flex={1} align="center" justify="center">
        <Spinner />
      </Flex>
    )
  }

  const coin = coins.filter((coin) => coin.id === id)[0] || coinDetail?.data[0]
  const prices = data && data.data.prices?.slice(Math.max(data.data.prices.length - 7, 0))

  const first = prices && prices[0]
  const last = prices && prices[6]
  const totalWeek = first && last && last[1] - first[1]
  const totalWeekPercentage = first && totalWeek && (Math.abs(last[1] - first[1]) / first[1]) * 100

  return (
    <>
      <Box bg={'bgColor'} h="100%">
        {!isWeb && (
          <IconButton
            w={16}
            h={10}
            size="xs"
            bg="transparent"
            onPress={back}
            top={8}
            left={4}
            _pressed={{
              bg: 'transparent',
            }}
            _icon={{
              as: MaterialIcons,
              name: 'arrow-back-ios',
              color: 'white',
            }}
          />
        )}
        <Center mt={8} mb={8}>
          <Heading color="white" fontSize="32px" fontFamily="rubik" fontWeight={500}>
            {coin?.name}
          </Heading>
          <Text fontFamily="rubik" fontSize={48}>
            $ {coin?.current_price}
          </Text>
          <IndicatorLabel
            direction={coin && coin?.price_change_24h > 0 ? 'up' : 'down'}
            firstValue={coin?.price_change_24h.toFixed(0) || ''}
            secondValue={coin?.market_cap_change_percentage_24h.toFixed(2) || ''}
          />
        </Center>
        <Divider key="first" h={0.25} color="lightgrey" bg="lightgrey" my={2} />

        {coin && (
          <MarketInfo
            coin={coin}
            totalWeek={totalWeek || 0}
            totalWeekPercentage={totalWeekPercentage || 0}
            styles={{ marginBottom: 16, marginTop: 16 }}
          />
        )}

        <Divider key="second-line" h={isWeb ? 0.25 : 0.5} color="lightgrey" bg="lightgrey" mt={2} />

        <Text fontFamily="roboto" fontWeight={500} fontSize={18} mt={[8, 16]} mb={[0, 4]} ml={[1, 32]}>
          {coin?.name} to USD Chart (7d)
        </Text>
        <Chart prices={prices} />
      </Box>
    </>
  )
}
