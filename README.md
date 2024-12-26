# BARK Protocol API

The BARK Protocol API is a backend service designed to manage BARK token emission schedules, fetch live token prices from various sources (CoinGecko, CoinMarketCap, Jupiter, Raydium), and handle rate-limiting for API requests. This service integrates with Solana and supports token-related data such as emission, payback, and burn rates.

## Features

- **Emission Schedule**: Calculate the emission, payback, and burn rates for BARK tokens over time.
- **Live Token Price Fetching**: Fetch BARK token prices from CoinGecko, CoinMarketCap, Jupiter, and Raydium.
- **Rate Limiting**: Prevent excessive API calls by enforcing rate limits.
- **Environmental Configurations**: Use custom environment variables for API keys and other configuration settings.

## Setup

### Prerequisites

- Node.js (v22.x or later)
- pnpm or yarn
- Next.js (v15 or later)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/bark-protocol/bark-protocol-api.git
   cd bark-protocol-api
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   COINGECKO_API_URL=https://api.coingecko.com/api/v3/simple/price
   COINMARKETCAP_API_URL=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
   JUPITER_API_URL=https://api.jupiter.com/v1/price
   JUPITER_API_KEY=your-jupiter-api-key
   COINMARKETCAP_API_KEY=your-coinmarketcap-api-key
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   ```

4. Run the application:
   ```bash
   pnpm run dev
   ```

The app will be available at `http://localhost:3000`.

## API Endpoints

### `/api/emission-data`

Fetches emission, payback, and burn rates for a given year.

#### Request
- **Method**: `GET`
- **Query Parameters**:
  - `year`: The year for which emission data is to be fetched. Defaults to `2025`.

#### Example
```bash
GET http://localhost:3000/api/emission-data?year=2025
```

#### Response
```json
{
  "message": "Emission data for the year 2025",
  "data": {
    "emissionRate": 1.75,
    "paybackRate": 0.00,
    "burnRate": 0.00,
    "totalSupply": 18446000000,
    "year": 2025
  }
}
```

### `/api/rate-limit`

Checks and enforces rate limits for the API.

#### Request
- **Method**: `GET`

#### Example
```bash
GET http://localhost:3000/api/rate-limit
```

#### Response
```json
{
  "message": "Rate limit status checked"
}
```

### `/api/token-price`

Fetches the live price of the BARK token from CoinGecko, CoinMarketCap, Jupiter, or Raydium.

#### Request
- **Method**: `GET`

#### Example
```bash
GET http://localhost:3000/api/token-price
```

#### Response
```json
{
  "price": 0.00001
}
```

## Emission Schedule

### Initial Supply
- **2024**: 18,446,744,073 BARK tokens

### Annual Inflation Rate
- Starting at 2% in 2025, decreasing by 0.25% each year.

### Emission Distribution
- **50%** Staking rewards
- **30%** Ecosystem
- **20%** Community

### Emission, Payback, and Burn Rates

| Year  | Emission Rate | Payback Rate | Burn Rate |
|-------|---------------|--------------|-----------|
| 2025  | 2.00%         | 0.00%        | 0.00%     |
| 2026  | 1.75%         | 0.00%        | 0.00%     |
| 2027  | 1.50%         | 0.00%        | 0.00%     |
| 2028  | 1.25%         | 0.00%        | 0.00%     |
| 2029  | 1.00%         | 0.00%        | 0.00%     |

## Contributing

We welcome contributions to the BARK Protocol API! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This API is based on estimated BARK token data, and values may not reflect the current blockchain state. Always verify token data with the official blockchain and external sources.

---

For more information, visit the [BARK Protocol](https://barkprotocol.net).
