import React from 'react'
import { Flex, Text } from 'native-base'
import { useCryptoSpace } from 'app/context/crypto-context'
import { getScrenType } from 'app/utils/screen'


export const CryptoListHeader: React.FC = () => {
  const { isWeb } = useCryptoSpace()
  const { isMobile, isLarge } = getScrenType()

  return (
    <Flex
      direction="row"
      alignItems="center"
      h={16}
      borderRadius="10px"
      shadow={10}
      ml={[8, 8]}
      paddingLeft={isWeb && isLarge ? 256 : 0}
      paddingRight={isWeb && isLarge ? 256 : 0}
    >
      <Flex flex={[0.5, 0.4]} justifyContent="flex-end">
        <Text textAlign="left" fontWeight="bold">#</Text>
      </Flex>

      <Flex flex={isMobile ? 0.8 : 0.6} justifyContent="flex-end">
        <Text textAlign="left" fontWeight="bold">Coin</Text>
      </Flex>

      <Flex flex={isMobile ? 1.2 : 0.7} justifyContent="flex-end">
        <Text textAlign="left" fontWeight="bold">Price</Text>
      </Flex>
      <Flex flex={isMobile ? 1 : 0.7} justifyContent="flex-end">
        <Text textAlign="left" fontWeight="bold">24 hr</Text>
      </Flex>

      {isWeb && !isMobile && (
        <>
          <Flex flex={1} justifyContent="flex-end">
            <Text textAlign="left" fontWeight="bold">24 hr Volume</Text>
          </Flex>
          <Flex flex={1.1} justifyContent="flex-end">
            <Text textAlign="left" fontWeight="bold">Market Cap</Text>
          </Flex>
        </>
      )}
    </Flex>
  )
}
