export function getAveragePrice(prices: number[]): number {
  const total = prices.reduce((acc, currentItem) => (acc += currentItem), 0);
  const average = total / prices.length;
  return Math.round((average + Number.EPSILON) * 100) / 100;
}
