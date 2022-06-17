import React from 'react'
import dayjs from 'dayjs'
import { View } from 'react-native'
import { Flex, Spinner } from 'native-base'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { HistoricDataType } from 'app/features/crypto/cryptoDetail'

type LineChartType = {
  data?: HistoricDataType
}

export const Chart: React.FC<LineChartType> = ({ data }) => {
  const prices = data?.prices.slice(Math.max(data?.prices?.length - 7, 0))

  const btcPrices = prices?.map((arr) => arr[1]) || []

  const dates =
    prices?.map((arr) => dayjs(new Date(arr[0])).format('MM-DD')) || []

  if (btcPrices.length === 0) {
    return (
      <Flex flex={1} justify="center" align="center">
        <Spinner />
      </Flex>
    )
  }

  return (
    <View>
      <LineChart
        data={{
          labels: [...dates],
          datasets: [
            {
              data: btcPrices,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#25507d',
          backgroundGradientFrom: '#4aa7dd',
          backgroundGradientTo: '#25507d',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </View>
  )
}
