import React, { ReactNode, useState } from 'react'
import { CoinType } from 'app/types/types'

export type CryptoContext = {
  coins: CoinType[]
  setCoins: (coins: CoinType[]) => void
}

const initialData = {
  coins: [],
  setCoins: () => undefined,
}

export const CryptoContext = React.createContext<CryptoContext>(initialData)

type Props = {
  children: ReactNode
}

export function CryptoSpaceProvider(props: Props) {
  const [cryptoSpace, setCryptoSpace] = useState<CryptoContext>({
    coins: [],

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
