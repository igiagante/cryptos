import { HistoricDataType } from 'app/features/crypto/cryptoDetail'
import { UserType } from 'app/provider/auth'
import { AuthData } from 'app/provider/auth/types'
import { CoinType } from 'app/types/types'
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
  },
  getCoins: (user: UserType) => {
    return loginInstance.post<string, AxiosResponse<AuthData>>('/security/login', user)
  },
}

const coinGecko = createAxiosIntance('https://api.coingecko.com/api/v3/coins')

export const coinGeckoApi = {

  getCoins: () => {
    const params = {
      vs_currency: 'usd',
      order: 'market_cap_rank',
      per_page: 10,
      page: 1,
    }
    return coinGecko.get<void, AxiosResponse<CoinType[]>>('markets', {params})
  },
  getCoinDetail: (id: string) => {
    const params = {
      vs_currency: 'usd',
      order: 'to',
      from: Math.floor(new Date(new Date().getDate() - 7).getTime() / 1000),
      to: Math.floor(new Date().getTime() / 1000),
    }
    return coinGecko.get<void, AxiosResponse<HistoricDataType>>(`/${id}/market_chart/range`, {params})
  },
}
