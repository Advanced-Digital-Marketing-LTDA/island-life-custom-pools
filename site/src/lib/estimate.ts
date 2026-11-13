// The finance estimator's arithmetic: a fixed rate and equal monthly payments. The page and the browser use the same function.
export interface Estimate { valid: boolean; monthly: number; total: number; interest: number }

export function estimate(amount: string | number, rate: string | number, years: string | number): Estimate {
  const principal = Number(amount);
  const annualRate = Number(rate);
  const term = Number(years);
  const valid = String(amount) !== '' && String(rate) !== '' && String(years) !== ''
    && principal >= 1000 && principal <= 1000000
    && annualRate >= 0 && annualRate <= 40
    && term >= 1 && term <= 30;
  if (!valid) return { valid: false, monthly: 0, total: 0, interest: 0 };

  const payments = term * 12;
  const monthlyRate = annualRate / 100 / 12;
  const monthly = monthlyRate === 0 ? principal / payments : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -payments));
  const total = monthly * payments;
  return { valid: true, monthly, total, interest: total - principal };
}

const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
export const money = (value: number) => dollars.format(value);
