
// "id": "bitcoin",
// "symbol": "btc",
// "name": "Bitcoin",
// "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
// "current_price": 22047,
// "market_cap": 420069125532,
// "market_cap_rank": 1,
// "fully_diluted_valuation": 462639687438,
// "total_volume": 46327503235,
// "high_24h": 23014,
// "low_24h": 21047,
// "price_change_24h": -404.8751955183361,
// "price_change_percentage_24h": -1.80332,
// "market_cap_change_24h": -9208500984.534851,
// "market_cap_change_percentage_24h": -2.14512,
// "circulating_supply": 19067650.0,
// "total_supply": 21000000.0,
// "max_supply": 21000000.0,
// "ath": 69045,
// "ath_change_percentage": -68.0925,
// "ath_date": "2021-11-10T14:24:11.849Z",
// "atl": 67.81,
// "atl_change_percentage": 32388.99306,
// "atl_date": "2013-07-06T00:00:00.000Z",
// "roi": null,
// "last_updated": "2022-06-15T00:21:39.113Z"

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