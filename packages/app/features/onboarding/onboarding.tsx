import React, { useContext } from 'react'
import { Flex, Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper'
import { useRouter } from 'solito/router'

const Dot: React.FC<{ selected: boolean }> = ({ selected }) => {
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        borderRadius: 99999,
        backgroundColor: selected ? 'gold' : 'D9D9D9',
      }}
    />
  )
}

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
)

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
)

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
)

const LEARNING = 'Start learning about blockchain & cryptocurrency'
const TOPICS = 'Decentralized, Security & Trustless'
const DEFI = 'Disrupting the World of Finance Using Blockchain Technology'



export const OnboardingScreen = () => {
  const { push, replace } = useRouter()

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dot}
      onSkip={() => replace('/')}
      onDone={() => replace('/')}
      pages={[
        {
          backgroundColor: '#263038',
          image: (
            <Flex w="100%" align="center">
              <Image
                source={require('../../assets/crypto_world.png')}
                resizeMode="contain"
                style={{ width: 380, height: 380 }}
              />
            </Flex>
          ),
          title: LEARNING,
          titleStyles: { marginBottom: 68, fontSize: 16, fontWeight: 'bold' },
          subtitle: '',
        },
        {
          backgroundColor: '#263038',
          image: (
            <Flex w="100%" align="center">
              <Image
                source={require('../../assets/mining.png')}
                resizeMode="contain"
                style={{ width: 380, height: 380 }}
              />
            </Flex>
          ),
          title: TOPICS,
          titleStyles: { marginBottom: 68, fontSize: 16, fontWeight: 'bold' },
          subtitle: '',
        },
        {
          backgroundColor: '#263038',
          image: (
            <Flex w="100%" align="center">
              <Image
                source={require('../../assets/defi.png')}
                resizeMode="contain"
                style={{ width: 380, height: 380 }}
              />
            </Flex>
          ),
          title: DEFI,
          titleStyles: { marginBottom: 68, fontSize: 16, fontWeight: 'bold' },
          subtitle: '',
        },
      ]}
    />
  )
}
