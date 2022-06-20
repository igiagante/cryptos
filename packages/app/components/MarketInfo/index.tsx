import React, { CSSProperties } from 'react'
import { Flex, HStack } from 'native-base'
import { CoinType } from 'app/types/types'
import { MarketInfoItem } from './MarketInfoItem'
import { IndicatorLabel } from '../IndicatorLabel'
import { StyleProp, ViewStyle } from 'react-native'

type MarketInfoType = {
  coin: CoinType
  totalWeek: number
  totalWeekPercentage: number
  styles?: StyleProp<ViewStyle>
}

export const MarketInfo: React.FC<MarketInfoType> = ({
  coin,
  totalWeek,
  totalWeekPercentage,
  styles,
}) => {
  const marketCapBillions =
    (Math.abs(Number(coin?.market_cap)) / 1.0e9).toFixed(2) + 'B'

  const volumeBillions =
    (Math.abs(Number(coin?.total_volume)) / 1.0e9).toFixed(2) + 'B'

  const marketCapDirection =
    coin && Number(coin?.market_cap) - coin?.market_cap_change_24h > 0
      ? 'up'
      : 'down'

  return (
    <HStack alignItems="center" h={16} p={4} space={3} mx={[4, 48, 64]} style={styles}>
      <Flex flex={1}>
        <MarketInfoItem
          title="Market Cap"
          subtitle={marketCapBillions}
          indicator={
            <IndicatorLabel
              direction='up'
              firstValue={'3.4%' || ''}
            />
          }
        />
      </Flex>

      {/* Get the volume data from the last 24hr */}
      <Flex flex={1.5} align="center">
        <MarketInfoItem
          title="24 hr Volume"
          subtitle={marketCapBillions}
          indicator={
            <IndicatorLabel direction='up' firstValue={volumeBillions} />
          }
          styles={{
            marginLeft: 4,
          }}
        />
      </Flex>

      <Flex flex={1}>
        <MarketInfoItem
          title="Week"
          subtitle={totalWeek.toString()}
          indicator={
            <IndicatorLabel
              direction={totalWeek > 0 ? 'up' : 'down'}
              firstValue='22%'
            />
          }
          styles={{
            marginLeft: 4,
          }}
        />
      </Flex>
    </HStack>
  )
}
