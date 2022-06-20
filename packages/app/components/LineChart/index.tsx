import React, { useContext } from 'react'
import dayjs from 'dayjs'
import { View } from 'react-native'
import { Flex, Spinner } from 'native-base'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { HistoricDataType } from 'app/features/coin/coin'
import { CryptoContext } from 'app/context/crypto-context'

type LineChartType = {
  prices: [number, number][] | undefined
}
// function kFormatter(num) {
//   return Math.abs(num) > 999
//     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
//     : Math.sign(num) * Math.abs(num)
// }

export const Chart: React.FC<LineChartType> = ({ prices }) => {
  const { isWeb } = useContext(CryptoContext)

  const btcPrices = prices?.map((arr) => arr[1]) || []

  const dates =
    prices?.map((arr) => dayjs(new Date(arr[0])).format('MM-DD')) || []

  if (btcPrices.length === 0) {
    return <Spinner />
  }

  return (
    <Flex flex={1} alignItems="center" justify="center" mt={4} ml={[0, 0, 4]}>
      <LineChart
        data={{
          labels: [...dates],
          datasets: [
            {
              data: btcPrices,
            },
          ],
        }}
        width={isWeb ? 1280 : Dimensions.get('window').width} // from react-native
        height={isWeb ? 480 : 230}
        chartConfig={{
          backgroundColor: '#25507d',
          backgroundGradientFrom: '#114357',
          backgroundGradientTo: '#F29492',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </Flex>
  )
}
