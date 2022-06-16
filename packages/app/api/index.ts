import { UserType } from 'app/provider/auth'
import { AuthData } from 'app/provider/auth/types'
import { AxiosResponse } from 'axios'
import axios from './axios'

const api = {
  login: (user: UserType) => {
    return axios.post<string, AxiosResponse<AuthData>>('/security/login', user)
  },
  refreshToken: (authData: AuthData) => {
    return axios.post<string, AxiosResponse<AuthData>>(
      '/security/refresh',
      authData
    )
  },
}

export default api
