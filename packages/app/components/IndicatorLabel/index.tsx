import React from 'react'
import { Text } from 'native-base'
import { Arrow } from '../Arrow'

type IndicatorLabelType = {
  direction: string
  firstValue: string
  secondValue?: string
}

export const IndicatorLabel: React.FC<IndicatorLabelType> = ({
  direction,
  firstValue,
  secondValue,
}) => {
  return (
    <Text
      fontFamily="rubik"
      fontSize={16}
      color={direction === 'up' ? 'green' : 'red'}
    >
      <Arrow direction={direction} /> {firstValue}{'  '}
      {secondValue && <Text style={{ color: 'gray' }}>({secondValue}%)</Text>}
    </Text>
  )
}
