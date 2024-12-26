import { NextRequest, NextResponse } from 'next/server';

// Initial data for emission rates, inflation, and distribution
const initialSupply = 18_446_744_073; // BARK Initial Supply (in tokens)
const annualInflationRate = 2; // Starting at 2%, decreasing by 0.25% each year
const emissionDistribution = {
  stakingRewards: 50, // 50% for staking rewards
  ecosystem: 30, // 30% for ecosystem
  charity: 10, // 10% for charity
  disasterRelief: 5, // 5% for disaster relief
  socialFinance: 5, // 5% for social finance
};

// Define the Payback and Burn Rates
const paybackRate = 30; // Payback rate is 30% of the emissions
const burnRate = 10; // Burn rate is 10% of the emissions

// Function to calculate emission data based on the year
function calculateEmissionData(year: number, totalSupply: number) {
  // Inflation rate decreases by 0.25% each year after 2024
  const inflationRate = Math.max(annualInflationRate - (year - 2024) * 0.25, 0); // Prevent negative inflation
  const totalEmission = totalSupply * (inflationRate / 100);

  // Calculate emissions for each category
  const stakingRewards = totalEmission * (emissionDistribution.stakingRewards / 100);
  const ecosystem = totalEmission * (emissionDistribution.ecosystem / 100);
  const charity = totalEmission * (emissionDistribution.charity / 100);
  const disasterRelief = totalEmission * (emissionDistribution.disasterRelief / 100);
  const socialFinance = totalEmission * (emissionDistribution.socialFinance / 100);

  // Calculate the Payback and Burn rates
  const payback = totalEmission * (paybackRate / 100); // Payback rate (30% of the emission)
  const burn = totalEmission * (burnRate / 100); // Burn rate (10% of the emission)

  return {
    year,
    inflationRate,
    totalEmission,
    stakingRewards,
    ecosystem,
    charity,
    disasterRelief,
    socialFinance,
    payback,
    burn,
  };
}

// Updated emission data with changed details and categories
const emissionData = [
  {
    id: 1,
    date: '2025-04-26',
    totalEmission: 1000,
    category: 'Energy Consumption',
    details: 'Emission from the energy used in powering the BARK protocol infrastructure. Aims to track and mitigate carbon footprint.',
    impact: 'Contributes to the global push for sustainable energy usage and emission reduction.',
  },
  {
    id: 2,
    date: '2025-08-26',
    totalEmission: 500,
    category: 'Transportation',
    details: 'Emission from transportation logistics and product delivery for BARK-related merchandise.',
    impact: 'Encourages use of more sustainable transport options in future logistics plans.',
  },
  {
    id: 3,
    date: '2025-12-25',
    totalEmission: 1200,
    category: 'Waste Management',
    details: 'Emission from waste generation due to packaging and end-of-life disposal of physical products related to BARK.',
    impact: 'Plans to reduce this over time through better waste management strategies.',
  },
];

// Fetch emission data (you could fetch from a database or external service)
async function fetchEmissionData(): Promise<any[]> {
  return emissionData;
}

// API route to get emission data along with emission, payback, and burn rates
export async function GET(req: NextRequest) {
  try {
    // Fetch the emission data
    const data = await fetchEmissionData();

    // Get the year from the request query (default to 2025)
    const year = Number(new URL(req.url).searchParams.get('year') || 2025);

    // Initialize the cumulative supply starting with the initial supply
    let cumulativeSupply = initialSupply;

    // Calculate the emission data for the requested year (consider cumulative emissions)
    for (let i = 2024; i <= year; i++) {
      const emissionRates = calculateEmissionData(i, cumulativeSupply);
      cumulativeSupply += emissionRates.totalEmission; // Update supply with emitted tokens
    }

    // Calculate the final emission data for the requested year with the updated cumulative supply
    const emissionRates = calculateEmissionData(year, cumulativeSupply);

    // Structure the response with the calculated data
    const response = {
      initialSupply,
      annualInflationRate,
      emissionDistribution,
      paybackRate,
      burnRate,
      emissionRates,
      emissionData: data,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch emission data' }, { status: 500 });
  }
}
