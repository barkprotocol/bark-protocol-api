// Constants for the BARK token emission and distribution
export const INITIAL_SUPPLY = 18446000000; // Initial total supply of BARK tokens (18.446 billion)
export const EMISSION_RATES = {
  2025: 2.00,   // 2% emission rate for 2024
  2026: 1.75,   // 1.75% emission rate for 2025
  2027: 1.50,   // 1.50% emission rate for 2026
  2028: 1.25,   // 1.25% emission rate for 2027
  2029: 1.00,   // 1.00% emission rate for 2028
};

// Distribution percentages for the BARK token emission
export const DISTRIBUTION_PERCENTAGES = {
  STAKING: 0.50,     // 50% for staking rewards
  ECOSYSTEM: 0.30,   // 30% for ecosystem
  COMMUNITY: 0.20,   // 20% for community
};

// Emission schedule constants
export const YEAR_START = 2025;
export const YEAR_END = 2029;
