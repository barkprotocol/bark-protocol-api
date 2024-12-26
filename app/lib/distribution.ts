/**
 * Function to calculate the token distribution based on the emission data.
 * It returns the calculated amount for staking rewards, ecosystem, and community allocation.
 * 
 * @param totalSupply - The total supply of BARK tokens at a specific year.
 * @param emissionRate - The annual emission rate of the BARK tokens (as a percentage).
 * @returns An object with the calculated amounts for staking rewards, ecosystem, and community.
 */
export function calculateTokenDistribution(totalSupply: number, emissionRate: number) {
    const emissionAmount = (totalSupply * emissionRate) / 100;
    
    // Distribution percentages
    const stakingPercentage = 0.50;  // 50% for staking rewards
    const ecosystemPercentage = 0.30;  // 30% for ecosystem
    const communityPercentage = 0.20;  // 20% for community
  
    // Calculate distribution amounts
    const stakingRewards = emissionAmount * stakingPercentage;
    const ecosystemRewards = emissionAmount * ecosystemPercentage;
    const communityRewards = emissionAmount * communityPercentage;
  
    return {
      stakingRewards,
      ecosystemRewards,
      communityRewards,
      totalEmissionAmount: emissionAmount,
    };
  }
  
  /**
   * Function to fetch the emission data based on the year and calculate the distribution.
   * It uses a fixed initial supply and calculates the distribution for each year.
   * 
   * @param year - The year for which emission data is requested.
   * @param totalSupply - The initial total supply of BARK tokens (constant across years).
   * @returns An object with emission data and the token distribution.
   */
  export function getEmissionData(year: number, totalSupply: number) {
    // Define emission rates by year
    const emissionRates: { [key: number]: number } = {
      2025: 2.00,
      2026: 1.75,
      2027: 1.50,
      2028: 1.25,
      2029: 1.00,
    };
  
    // Get the emission rate for the given year
    const emissionRate = emissionRates[year] || 2.00;  // Default to 2% for 2025
  
    // Calculate the distribution for the given year
    const distribution = calculateTokenDistribution(totalSupply, emissionRate);
  
    return {
      year,
      emissionRate,
      totalSupply,
      ...distribution,
    };
  }
  