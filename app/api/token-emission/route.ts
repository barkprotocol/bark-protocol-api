import { NextResponse } from 'next/server';
import { getEmissionData } from '../../lib/token-emission';

export async function GET(request: Request) {
  // Default starting total supply for 2024
  let totalSupply = 18_446_744_073; // 18.46 billion tokens for 2024

  // Get the year from the request query
  const year = Number(new URL(request.url).searchParams.get('year') || 2025);

  // Fetch emission data based on the year
  const emissionData = getEmissionData(year, totalSupply);

  // Update the totalSupply based on previous emissions, if the requested year is after 2025
  if (year > 2025) {
    let cumulativeSupply = totalSupply;  // Start with the initial total supply

    for (let i = 2025; i < year; i++) {
      const previousYearData = getEmissionData(i, cumulativeSupply);
      cumulativeSupply += previousYearData.emissionAmount;  // Update cumulative supply with the new emission
    }

    // After calculating the cumulative supply, fetch the updated emission data for the requested year
    const updatedEmissionData = getEmissionData(year, cumulativeSupply);

    // Return the response with the calculated data
    return NextResponse.json({
      message: `Emission data for the year ${year}`,
      data: updatedEmissionData,
    });
  }

  // For years up to 2025, just return the fetched emission data
  return NextResponse.json({
    message: `Emission data for the year ${year}`,
    data: emissionData,
  });
}
