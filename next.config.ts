import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // Define custom environment variables
    COINGECKO_API_URL: process.env.COINGECKO_API_URL,
    COINMARKETCAP_API_URL: process.env.COINMARKETCAP_API_URL,
    JUPITER_API_URL: process.env.JUPITER_API_URL,
    JUPITER_API_KEY: process.env.JUPITER_API_KEY,
    COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
    SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
  },
  webpack(config) {
    return config;
  },
};

export default nextConfig;