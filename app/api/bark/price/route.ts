import { NextResponse } from 'next/server';

// Fetch BARK token price from CoinGecko
async function fetchFromCoinGecko() {
  const url = `${process.env.COINGECKO_API_URL}?ids=bark&vs_currencies=usd`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch BARK token price from CoinGecko');
  }
  const data = await response.json();
  return data.bark?.usd; // Return BARK price in USD
}

// Fetch BARK token price from CoinMarketCap
async function fetchFromCoinMarketCap() {
  const url = `${process.env.COINMARKETCAP_API_URL}?symbol=BARK&convert=USD`;
  const headers = {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY!,
  };
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch BARK token price from CoinMarketCap');
  }
  const data = await response.json();
  const price = data.data.find((item: any) => item.symbol === 'BARK')?.quote?.USD?.price;
  return price;
}

// Fetch BARK token price from Jupiter
async function fetchFromJupiter() {
  const url = `${process.env.JUPITER_API_URL}?token=BARK&vs_currency=usd`;
  const headers = {
    'Authorization': `Bearer ${process.env.JUPITER_API_KEY!}`,
  };
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch BARK token price from Jupiter');
  }
  const data = await response.json();
  return data.price; // Return the price of the token
}

// Fetch BARK token price from Raydium (using Solana RPC)
async function fetchFromRaydium() {
  const poolAddresses = [
    '46CPZHBw6u7VAnXpcm6kmCZtnMq1xuvfouoL8kQUjScC', // BARK/SOL Pool
    '46CPZHBw6u7VAnXpcm6kmCZtnMq1xuvfouoL8kQUjScC', // SOL/BARK Pool Address
    //'USDC_POOL_ADDRESS_HERE', // Replace with USDC/BARK Pool Address
    //'BARK_USDC_POOL_ADDRESS_HERE' // Replace with BARK/USDC Pool Address
  ];

  const url = 'https://api.mainnet-beta.solana.com'; // Solana RPC URL

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'getMultipleAccounts',
    params: [
      poolAddresses,
      { commitment: 'finalized' }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch BARK token price from Raydium');
  }

  const data = await response.json();
  // Process Raydium pool data here to extract token price
  // Extract price based on the pool data; the following is just a placeholder
  const raydiumPrices = poolAddresses.map(address => {
    const poolData = data.result.find((item: any) => item.pubkey === address);
    return poolData ? poolData.value.data.parsed.info.tokenAmount.uiAmount : null;
  });

  return raydiumPrices.filter(price => price !== null)[0]; // Return first non-null price
}

// Function to get the price of the BARK token from all sources
async function fetchTokenPrice() {
  try {
    // Attempt to fetch price from CoinGecko, CoinMarketCap, Jupiter, and Raydium
    const priceFromCoinGecko = await fetchFromCoinGecko();
    const priceFromCoinMarketCap = await fetchFromCoinMarketCap();
    const priceFromJupiter = await fetchFromJupiter();
    const priceFromRaydium = await fetchFromRaydium();

    // Choose a reliable source (you could also use fallback logic here)
    const price = priceFromCoinGecko || priceFromCoinMarketCap || priceFromJupiter || priceFromRaydium;

    if (!price) {
      throw new Error('Unable to fetch BARK token price from all sources');
    }
    return price;
  } catch (error) {
    throw new Error(`Failed to fetch BARK token price: ${error.message}`);
  }
}

// API route to get BARK token price
export async function GET() {
  try {
    const tokenPrice = await fetchTokenPrice();
    return NextResponse.json({ price: tokenPrice }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch BARK token price: ${error.message}` }, { status: 500 });
  }
}
