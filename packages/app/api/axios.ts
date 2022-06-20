import axios from 'axios'
import { NETWORK_ERROR, UNAUTHORIZED_ERROR } from './errors'

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