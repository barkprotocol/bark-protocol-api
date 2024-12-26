import { NextRequest, NextResponse } from 'next/server';

// Fetch BARK token price from CoinGecko
async function fetchFromCoinGecko() {
  try {
    const url = `${process.env.COINGECKO_API_URL}?ids=bark&vs_currencies=usd`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch BARK token price from CoinGecko');
    }

    const data = await response.json();
    if (!data.bark) {
      throw new Error('BARK token data not found from CoinGecko');
    }

    return data.bark?.usd; // Return BARK price in USD
  } catch (error) {
    console.error(`Error in CoinGecko: ${error.message}`);
    throw error;
  }
}

// Fetch BARK token price from CoinMarketCap
async function fetchFromCoinMarketCap() {
  try {
    const url = `${process.env.COINMARKETCAP_API_URL}?symbol=BARK&convert=USD`;
    const headers = {
      'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY!,
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch BARK token price from CoinMarketCap');
    }

    const data = await response.json();
    const price = data.data?.find((item: any) => item.symbol === 'BARK')?.quote?.USD?.price;

    if (!price) {
      throw new Error('BARK token price not found in CoinMarketCap response');
    }

    return price;
  } catch (error) {
    console.error(`Error in CoinMarketCap: ${error.message}`);
    throw error;
  }
}

// Fetch BARK token price from Jupiter
async function fetchFromJupiter() {
  try {
    const url = `${process.env.JUPITER_API_URL}?token=BARK&vs_currency=usd`;
    const headers = {
      'Authorization': `Bearer ${process.env.JUPITER_API_KEY!}`,
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch BARK token price from Jupiter');
    }

    const data = await response.json();
    if (!data.price) {
      throw new Error('BARK token price not found in Jupiter response');
    }

    return data.price; // Return the price of the token
  } catch (error) {
    console.error(`Error in Jupiter: ${error.message}`);
    throw error;
  }
}

// Function to get the price of the BARK token from all sources
async function fetchTokenPrice() {
  try {
    // Attempt to fetch price from CoinGecko, CoinMarketCap, and Jupiter
    const priceFromCoinGecko = await fetchFromCoinGecko();
    const priceFromCoinMarketCap = await fetchFromCoinMarketCap();
    const priceFromJupiter = await fetchFromJupiter();

    // Choose a reliable source (you could also use fallback logic here)
    const price = priceFromCoinGecko || priceFromCoinMarketCap || priceFromJupiter;

    if (!price) {
      throw new Error('Unable to fetch BARK token price from all sources');
    }

    return price;
  } catch (error) {
    console.error(`Error in fetchTokenPrice: ${error.message}`);
    throw new Error(`Failed to fetch BARK token price: ${error.message}`);
  }
}

// Simulate a service that provides pricing data (optional mock service)
const fetchPriceData = async (): Promise<any> => {
  // Simulate fetching token prices from an external API or database
  return {
    token: 'BARK',
    price: 0.000000010, // Price in USD for BARK token
    timestamp: new Date().toISOString(),
  };
};

// API route to get the current price of the BARK token
export async function GET(req: NextRequest) {
  try {
    // Fetch the price data from the fetchTokenPrice function
    const tokenPrice = await fetchTokenPrice(); // Or use fetchPriceData() for mock service

    // Return the price data in JSON format
    return NextResponse.json({ price: tokenPrice }, { status: 200 });
  } catch (error) {
    // In case of error, return a meaningful error message
    return NextResponse.json({ error: `Failed to fetch BARK token price: ${error.message}` }, { status: 500 });
  }
}
