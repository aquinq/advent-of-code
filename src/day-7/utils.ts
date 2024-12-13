export type EmptyEquation = { result: number; operands: number[] };

export const parseData = (input: string): EmptyEquation[] =>
  input.split('\n').map((line) => {
    const [result, operands] = line.split(': ');
    return {
      result: Number(result),
      operands: operands.split(' ').map(Number),
    };
  });

export const toNBaseArray = (n: number, length: number, base: number): number[] => {
  const nBase = n.toString(base).padStart(length, '0');
  return nBase.split('').map(Number);
};
