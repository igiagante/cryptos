import React from 'react'
import { Image, Flex, Text, AspectRatio, HStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'

type CryptoItemType = {
  rank: number
  name: string
  symbol: string
  imgSrc: string
  price: number
  lastChange: number
}

export const CryptoItem: React.FC<CryptoItemType> = ({
  rank,
  name,
  symbol,
  imgSrc,
  price,
  lastChange,
}) => {
  const { push } = useRouter()

  return (
    <TouchableOpacity
      onPress={() => push(`/cryptoDetail/${name.toLocaleLowerCase()}`)}
    >
      <HStack
        bg="bgColor"
        alignItems="center"
        h={16}
        p={4}
        borderRadius="10px"
        shadow={10}
        my={2}
        mx={4}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.8,
          shadowRadius: 3.84,
          elevation: 10,
        }}
      >
        <Text flex={0.5} fontSize="md">
          #{rank}
        </Text>
        <Flex w="100%" direction="row" flex={1}>
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
        <Flex w="100%" flex={1.2} justifyContent="flex-end" paddingRight={4}>
          <Text textAlign="right">${price.toFixed(2)}</Text>
        </Flex>
        <Flex w="100%" flex={1} justifyContent="flex-end" paddingRight={4}>
          <Text
            fontSize="md"
            color={lastChange < 0 ? 'red' : 'green'}
            textAlign="right"
          >
            % {lastChange.toFixed(2)}
          </Text>
        </Flex>
      </HStack>
    </TouchableOpacity>
  )
}
