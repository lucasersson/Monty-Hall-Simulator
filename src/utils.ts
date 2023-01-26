export const calculateWinPercentage = (
  decimals: number,
  probability?: number,
) => {
  if (probability === undefined) {
    return undefined
  }

  const percentage = probability * 100;
  const parsed = parseFloat(percentage.toString()).toFixed(decimals);

  return +parsed;
};
