import { HistoricDataType } from 'app/features/coin/coin'
import { UserType } from 'app/provider/auth'
import { AuthData } from 'app/provider/auth/types'
import { CoinType, SimplePriceType } from 'app/types/types'
import { AxiosResponse } from 'axios'
import { createAxiosIntance } from './axios'

export const loginInstance = createAxiosIntance('http://localhost:3308/api/v1')

export const loginApi = {
  login: (user: UserType) => {
    return loginInstance.post<string, AxiosResponse<AuthData>>('/security/login', user)
  },
  refreshToken: (authData: AuthData) => {
    return loginInstance.post<string, AxiosResponse<AuthData>>(
      '/security/refresh',
      authData
    )
  }
}

export const coinGeckoInstance = createAxiosIntance('https://api.coingecko.com/api/v3')

export const coinGeckoApi = {

  getCoins: () => {
    const params = {
      vs_currency: 'usd',
      order: 'market_cap_rank',
      per_page: 10,
      page: 1,
    }
    return coinGeckoInstance.get<void, AxiosResponse<CoinType[]>>('/coins/markets', {params})
  },
  
  getCoinDetail: (id: string) => {
    const params = {
      ids: id,
      vs_currency: 'usd',
      order: 'market_cap_rank',
      per_page: 10,
      page: 1,
    }
    return coinGeckoInstance.get<void, AxiosResponse<CoinType[]>>('/coins/markets', {params})
  },
  getCoinHistoricData: (id: string) => {
    const params = {
      vs_currency: 'usd',
      order: 'to',
      from: Math.floor(new Date(new Date().getDate() - 7).getTime() / 1000),
      to: Math.floor(new Date().getTime() / 1000),
    }
    return coinGeckoInstance.get<void, AxiosResponse<HistoricDataType>>(`/coins/${id}/market_chart/range`, {params})
  },
}