import React from 'react'
import { Flex, HStack, Text } from 'native-base'
import { Arrow } from '../Arrow'

type IndicatorLabelType = {
  direction: string
  firstValue: string
  secondValue?: string
}

export const IndicatorLabel: React.FC<IndicatorLabelType> = ({ direction, firstValue, secondValue }) => {
  return (
    <Flex direction="row" justifyContent={['flex-start', 'center']}>
      <Flex direction="row" justifyContent="center" alignItems="center">
        <Arrow direction={direction} />
        <Text ml={[1, 2]} fontFamily="rubik" fontSize={[16, 20]} color={direction === 'up' ? 'green' : 'red'}>
          {firstValue}
        </Text>
      </Flex>
      <Text fontFamily="rubik" fontSize={[16, 20]} color={direction === 'up' ? 'green' : 'red'}>
        {secondValue && <Text style={{ color: 'gray' }}> ({secondValue}%)</Text>}
      </Text>
    </Flex>
  )
}
