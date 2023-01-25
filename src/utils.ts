export const calculateWinPercentage = (
  probability: number,
  decimals: number
) => {
  const percentage = probability * 100;
  const parsed = parseFloat(percentage.toString()).toFixed(decimals);

  return +parsed;
};
