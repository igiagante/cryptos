import React from 'react'
import { View } from 'react-native'

const styles = {
  arrowUp: {
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 6,
    borderBottomWidth: 12,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 12,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderLeftWidth: 6,
    borderTopColor: 'red',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
}

type ArrowType = {
  direction: string
}

export const Arrow: React.FC<ArrowType> = ({ direction }) => {
  return <View style={direction === 'up' ? styles.arrowUp : styles.arrowDown} />
}
