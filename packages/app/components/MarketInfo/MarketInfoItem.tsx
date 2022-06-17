import React from 'react'
import { Flex, Text } from 'native-base'
import { StyleProp, ViewStyle } from 'react-native'

type MarketInfoItemType = {
  title: string
  subtitle: string
  indicator: React.ReactElement
  styles?: StyleProp<ViewStyle>
}

export const MarketInfoItem: React.FC<MarketInfoItemType> = ({
  title,
  subtitle,
  indicator,
  styles
}) => {
  return (
    <Flex style={styles}>
      <Text
        textAlign="left"
        color="lightgrey"
        fontFamily="roboto"
        fontWeight={400}
      >
        {title}
      </Text>
      <Text textAlign="left" color="white" fontFamily="roboto" fontWeight={700}>
        {subtitle}
      </Text>
      {indicator}
    </Flex>
  )
}
