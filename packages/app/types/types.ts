export type CoinPriceType = {
  usd: number
  usd_market_cap: number
  usd_24h_vol: number
  usd_24h_change: number
}

export type SimplePriceType = {
    coin: CoinPriceType
}

export type CoinType = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: Number
  market_cap_rank: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
}
