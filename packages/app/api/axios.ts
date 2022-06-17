import axios from 'axios'
import { NETWORK_ERROR, UNAUTHORIZED_ERROR } from './errors'

const apiBaseUrl = 'http://localhost:3308'

const instance = axios.create({
  baseURL: `http://localhost:3308/api/v1`,
})

axios.defaults.baseURL = `${apiBaseUrl}/api/v1`

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(NETWORK_ERROR)
    } else if (error.response.status === 401) {
      return Promise.reject(UNAUTHORIZED_ERROR)
    }
  }
)

export const createAxiosIntance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (!error.response) {
        return Promise.reject(NETWORK_ERROR)
      } else if (error.response.status === 401) {
        return Promise.reject(UNAUTHORIZED_ERROR)
      }
    }
  )
  return instance
}
