import { useWindowDimensions } from 'react-native'

export const getScrenType = () => {
  const { width } = useWindowDimensions()
  const screenWidth = width || 1280
  const isLarge = screenWidth >= 1280
  const isMedium = screenWidth < 780 && screenWidth > 380
  const isMobile = screenWidth < 780

  return { isLarge, isMedium, isMobile }
}
