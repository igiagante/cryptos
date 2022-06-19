import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Flex, Spinner } from 'native-base'

type Props = {
  url: string
  path: string
  params: Record<string, unknown>
}

export const useGetCryptoFetch = <T>(props: Props): [T, boolean] => {
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

  useEffect(() => {
    fetchData()
  }, [])

  return [data as T, isLoading]
}
export const useFirstLunch = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null)

  useEffect(() => {
    async function loadStorageData() {
      const firstLoaded = await AsyncStorage.getItem('firstLoaded')

      if (firstLoaded === null) {
        AsyncStorage.setItem('firstLoaded', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    }

    loadStorageData()
  }, [])

  return [isFirstLaunch]
}
