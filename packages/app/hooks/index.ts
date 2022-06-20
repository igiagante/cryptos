import NetInfo from '@react-native-community/netinfo'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = React.useState<boolean>(true)
  const [isInternetReachable, setIsInternetReachable] = React.useState<boolean | null | undefined>(undefined)

  React.useEffect(() => {
    return NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected != null && state.isConnected)
      setIsInternetReachable(state.isInternetReachable)
    })
  }, [])

  return React.useMemo(() => ({ isConnected, isInternetReachable }), [isConnected, isInternetReachable])
}

export function useRefreshOnFocus(refetch: () => void) {
  const enabledRef = React.useRef(false)

  useFocusEffect(
    React.useCallback(() => {
      if (enabledRef.current) {
        // console.log(Date.now(), 'Refetching initiated by screen focus')
        refetch()
      } else {
        enabledRef.current = true
      }
    }, [refetch])
  )
}
