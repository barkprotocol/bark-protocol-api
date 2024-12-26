# BARK Protocol API

## Overview

BARK Protocol API integrates Solana blockchain and multiple token price APIs to fetch live BARK token prices. It supports various functionalities including fetching the price of the **BARK token (BARK)** from multiple sources such as CoinGecko, CoinMarketCap, Jupiter, and Raydium, as well as managing token staking and marketplace features on Solana.

This application allows seamless interaction with Solana blockchain-based assets, ensuring quick and secure access to market prices and transaction functionalities.

## Features

- Fetch token prices for **BARK** from multiple APIs:
  - **CoinGecko**: Track the price of BARK token in USD.
  - **CoinMarketCap**: Fetch BARK token prices and display them on the platform.
  - **Jupiter**: Provides another method to fetch token prices.
  - **Raydium**: Fetch liquidity pool data for BARK token and other Solana tokens.


## Requirements

- Node.js (v20 or later)
- Next.js 15 (for frontend)
- Solana wallet adapters (e.g., Phantom, Solflare, Backpack)
- APIs for CoinGecko, CoinMarketCap, Jupiter, and Raydium (API keys are required)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bark-protocol/bark-protocol-api.git
cd bark-protocol-api
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```ini
COINGECKO_API_URL=https://api.coingecko.com/api/v3/simple/price
COINMARKETCAP_API_URL=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
JUPITER_API_URL=https://api.jup.ag/v1
JUPITER_API_KEY=your-jupiter-api-key
COINMARKETCAP_API_KEY=your-coinmarketcap-api-key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

Make sure to replace the `your-jupiter-api-key` and `your-coinmarketcap-api-key` placeholders with actual API keys.

### 4. Run the Development Server

To start the development server, run:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:3000`.

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel.
2. Set up environment variables in the Vercel dashboard under "Environment Variables."
3. Deploy your project by following Vercel’s deployment steps.

### Build and Export

To build the project for production:

```bash
pnpm run build
```

Then run:

```bash
pnpm start
```

This will start the production server.

## Testing

The application is designed to handle errors gracefully. The token price fetching API routes will attempt to fetch prices from multiple sources, including CoinGecko, CoinMarketCap, Jupiter, and Raydium.

- Ensure the API keys are correctly set in your environment variables to avoid "API key missing" errors.
- Use tools like [Solscan](https://solscan.io) or [Raydium](https://raydium.io) to get accurate pool addresses for fetching price data from Raydium.

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes.
4. Push to your forked repository (`git push origin feature-xyz`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Solana**: For building a high-speed blockchain.
- **Raydium**: For decentralized exchange liquidity.
- **CoinGecko**: For providing cryptocurrency price data.
- **CoinMarketCap**: For delivering real-time market data.
- **Jupiter**: For optimizing Solana token swaps.
```