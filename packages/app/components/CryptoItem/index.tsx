import React from 'react'
import { Image, Flex, Text, AspectRatio, HStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
import { useCryptoSpace } from 'app/context/crypto-context'
import { getScrenType } from 'app/utils/screen'

type CryptoItemType = {
  id: string
  rank: number
  name: string
  symbol: string
  imgSrc: string
  price: number
  lastChange: number
  volume: number
  marketCap: number
}

export const CryptoItem: React.FC<CryptoItemType> = ({
  id,
  rank,
  symbol,
  imgSrc,
  price,
  lastChange,
  volume,
  marketCap,
}) => {
  const { push } = useRouter()
  const { isWeb } = useCryptoSpace()
  const { isMobile, isMedium, isLarge } = getScrenType()

  const itemStyle = {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 10,
  }

  return (
    <TouchableOpacity onPress={() => push(`/coin/${id.toLocaleLowerCase()}`)}>
      <Flex
        h={16}
        p={4}
        my={2}
        mx={4}
        direction="row"
        bg="bgColor"
        alignItems="center"
        shadow={rank === 0 ? 0 : 10}
        style={rank !== 0 ? itemStyle : null}
      >
        <Text flex={[0.5, 0.4]} fontSize="md">
          #{rank}
        </Text>
        <Flex w="100%" direction="row" flex={[1, 0.75]}>
          <AspectRatio w={8} h={8}>
            <Image
              source={{
                uri: imgSrc,
              }}
              alt="crypto logo"
              resizeMode="contain"
            />
          </AspectRatio>
          <Text ml={1} textAlign="right" fontFamily="roboto" fontWeight={500}>
            {symbol.toUpperCase()}
          </Text>
        </Flex>
        <Flex w="100%" flex={[1.2, 0.75]} paddingRight={[4, 0]}>
          <Text textAlign={['right', 'start']}>${price.toFixed(2)}</Text>
        </Flex>
        <Flex w="100%" flex={[0.8, 0.8]} paddingRight={[4, 0]} ml={[1, 0]}>
          <Text fontSize="md" color={lastChange < 0 ? 'red' : 'green'} textAlign={['right', 'start']}>
            {lastChange > 0 ? `  ${lastChange.toFixed(2)}` : lastChange.toFixed(2)} %
          </Text>
        </Flex>
        {isWeb && !isMobile && (
          <>
            <Flex flex={1.1} justifyContent="flex-end">
              <Text textAlign="left">{volume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
            </Flex>
            <Flex flex={1.1} justifyContent="flex-end">
              <Text textAlign="left">{marketCap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
            </Flex>
          </>
        )}
      </Flex>
    </TouchableOpacity>
  )
}
