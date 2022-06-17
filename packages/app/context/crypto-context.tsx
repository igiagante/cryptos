import { useGetCryptoFetch } from 'app/hooks'
import { CoinType } from 'app/types/types'
import React, { ReactNode, useEffect, useState } from 'react'

type HistoricDataType = {
  prices: number[][]
  market_caps: number[][]
  total_volumes: number[][]
}

type CoinHistoricDataType = {
  symbol: string
  data: HistoricDataType
}

export type CryptoContext = {
  coins: CoinType[]
  coinHistoricData: {
    symbol: string
    data: HistoricDataType
  }
  setCoinHistoricData: (data: CoinHistoricDataType) => void
  setCoins: (coins: CoinType[]) => void
}

const prices = [
    [
      1655078511495,
      26767.269173221313
    ],
    [
      1655082159148,
      26389.12501208166
    ],

]

const market_caps = [
    [
      1655078511495,
      514202090511.0678
    ],
    [
      1655082159148,
      507726865526.39087
    ],
]

const total_volumes = [
    [
      1655078511495,
      29834061115.62461
    ],
    [
      1655082159148,
      31544500557.829193
    ],
]

const initialData = {
  coins: [],
  coinHistoricData: {
    symbol: '',
    data: {
      prices,
      market_caps,
      total_volumes,
    },
  },
  setCoinHistoricData: (data: CoinHistoricDataType) => undefined,
  setCoins: (coins: CoinType[]) => undefined,
}

export const CryptoContext = React.createContext<CryptoContext>(initialData)

type Props = {
  children: ReactNode
}

export function CryptoSpaceProvider(props: Props) {
  const [cryptoSpace, setCryptoSpace] = useState<CryptoContext>({
    coins: [],
    coinHistoricData: {
      symbol: '',
      data: {
        prices: [[0, 0]],
        market_caps: [[0, 0]],
        total_volumes: [[0, 0]],
      },
    },

    setCoins: (coins: CoinType[]) => {
      setCryptoSpace((prevState) => {
        const newState = { ...prevState }
        newState.coins = coins
        return newState
      })
    },
    setCoinHistoricData: (data: CoinHistoricDataType) => {
      setCryptoSpace((prevState) => {
        const newState = { ...prevState }
        newState.coinHistoricData = data
        return newState
      })
    },
  })

  const [data, getData, isLoading] = useGetCryptoFetch<CoinType[]>({
    url: 'https://api.coingecko.com/api/v3/coins',
    path: 'markets',
    params: {
      vs_currency: 'usd',
      order: 'market_cap_rank',
      per_page: 10,
      page: 1,
    },
  })

  useEffect(() => {
    getData()
  }, [])

  // Get Coins
  useEffect(() => {
    if (data) {
        setCryptoSpace((prevState) => {
        const newState = { ...prevState }
        newState.coins = data
        return newState
      })
    }
  }, [data])

  // Loading data
  //   if (isLoading) {
  //     const spinnerColor = getContrastColor(builder.theme.body.background)
  //     return (
  //       <Flex pos="fixed" height="100%" width="100%">
  //         <Center width="100%">
  //           <Spinner size="xl" color={spinnerColor} />
  //         </Center>
  //       </Flex>
  //     )
  //   }

  return (
    <CryptoContext.Provider
      value={{
        ...cryptoSpace,
      }}
      {...props}
    />
  )
}

export function useCryptoSpace(): CryptoContext {
  const context: CryptoContext = React.useContext(CryptoContext)
  if (!context) {
    throw new Error(
      'useCryptoSpace should be inside of the CryptoContext provider'
    )
  }
  return context
}
