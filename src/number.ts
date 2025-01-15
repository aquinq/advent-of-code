export const greatestCommonDivisor = (a: number, b: number): number => {
  const [x, y] = a < b ? [a, b] : [b, a];
  return x === 0 ? y : greatestCommonDivisor(y % x, x);
};

export const leastCommonMultiple = (a: number, b: number) => (a * b) / greatestCommonDivisor(a, b);
