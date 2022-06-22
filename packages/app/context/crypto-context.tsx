import React, { ReactNode, useState } from 'react'
import { CoinType } from 'app/types/types'
import { Platform } from 'react-native'

export type CryptoContext = {
  coins: CoinType[]
  isWeb: boolean
  setCoins: (coins: CoinType[]) => void
}

const initialData = {
  coins: [],
  isWeb: false,
  setCoins: () => undefined,
}

export const CryptoContext = React.createContext<CryptoContext>(initialData)

type Props = {
  children: ReactNode
}

export function CryptoSpaceProvider(props: Props) {
  const [cryptoSpace, setCryptoSpace] = useState<CryptoContext>({
    coins: [],
    isWeb: Platform.OS === 'web',
    setCoins: (coins: CoinType[]) => {
      setCryptoSpace((prevState) => {
        const newState = { ...prevState }
        newState.coins = coins
        return newState
      })
    },
  })

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
    throw new Error('useCryptoSpace should be inside of the CryptoContext provider')
  }
  return context
}