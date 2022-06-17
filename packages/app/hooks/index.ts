import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

type Props = {
  url: string
  path: string
  params: Record<string, unknown>
}

export const useGetCryptoFetch = <T>(props: Props): [T, () => void, boolean] => {
  const { url, path, params } = props

  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)

  const instance = axios.create({
    baseURL: url,
  })

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const result = await instance.get<void, AxiosResponse<T>>(path, {
        params,
      })

      if (result) {
        setData(result.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const getData = () => {
    if (location) {
      fetchData()
    } else {
      setIsLoading(false)
    }
  }

  return [data as T, getData, isLoading]
}
