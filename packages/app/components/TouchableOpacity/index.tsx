
import React from 'react'
import { Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

type TouchableOpacityButtonType = {
  title: string
  props: React.ReactElement
}

export const TouchableOpacityButton: React.FC<TouchableOpacityButtonType> = ({
  title,
  props
}) => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  )
}