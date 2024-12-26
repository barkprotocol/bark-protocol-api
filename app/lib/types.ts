// Type definition for the token distribution response
export type TokenDistribution = {
    stakingRewards: number;  // Amount allocated for staking rewards
    ecosystemRewards: number;  // Amount allocated for ecosystem
    communityRewards: number;  // Amount allocated for community
    totalEmissionAmount: number;  // Total emission amount for the year
  };
  
  // Type definition for the emission data object
  export type EmissionData = {
    year: number;  // The year for the emission data
    emissionRate: number;  // The emission rate for the year (percentage)
    totalSupply: number;  // The total supply of tokens for that year
    stakingRewards: number;  // Amount for staking rewards
    ecosystemRewards: number;  // Amount for ecosystem rewards
    communityRewards: number;  // Amount for community rewards
    totalEmissionAmount: number;  // Total emission amount for the year
  };
  
  // Type for the emission rate mapping (year to emission rate)
  export type EmissionRatesMap = {
    [year: number]: number;  // Yearly emission rate percentage
  };
  