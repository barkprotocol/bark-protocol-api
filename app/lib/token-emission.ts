interface EmissionData {
    [x: string]: number;
    year: number;
    totalSupply: number;
    emissionRate: number;
    paybackRate: number;
    burnRate: number;
  }
  
  export function calculateEmission(emissionRate: number, totalSupply: number): number {
    return (emissionRate / 100) * totalSupply;
  }
  
  export function calculatePayback(emissionAmount: number, paybackRate: number): number {
    return (paybackRate / 100) * emissionAmount;
  }
  
  export function calculateBurn(emissionAmount: number, burnRate: number): number {
    return (burnRate / 100) * emissionAmount;
  }
  
  export function updateTotalSupply(totalSupply: number, emissionAmount: number): number {
    return totalSupply + emissionAmount;
  }
  
  export function getEmissionData(year: number, totalSupply: number): EmissionData {
    let emissionRate = 0;
    let paybackRate = 0;
    let burnRate = 0;
  
    // Update rates based on the year
    switch(year) {
      case 2024:
        emissionRate = 2.00;
        paybackRate = 0.00;
        burnRate = 0.00;
        break;
      case 2025:
        emissionRate = 1.75;
        paybackRate = 0.00;
        burnRate = 0.00;
        break;
      case 2026:
        emissionRate = 1.50;
        paybackRate = 0.00;
        burnRate = 0.00;
        break;
      case 2027:
        emissionRate = 1.25;
        paybackRate = 0.00;
        burnRate = 0.00;
        break;
      case 2028:
        emissionRate = 1.00;
        paybackRate = 0.00;
        burnRate = 0.00;
        break;
      default:
        emissionRate = 0.00;
        paybackRate = 0.00;
        burnRate = 0.00;
        break;
    }
  
    const emissionAmount = calculateEmission(emissionRate, totalSupply);
    const paybackAmount = calculatePayback(emissionAmount, paybackRate);
    const burnAmount = calculateBurn(emissionAmount, burnRate);
  
    return {
      year,
      totalSupply,
      emissionRate,
      paybackRate,
      burnRate,
    };
  }
  