import { parseData } from './utils';

const floatingPointThreshold = 1e-10;

const isValidPressCount = (n: number) => Math.abs(Math.round(n) - n) < floatingPointThreshold;

const run = (data: string, part = 1) => {
  const machines = parseData(data, part);

  let tokensCount = 0;

  for (let i = 0; i < machines.length; ++i) {
    const { a, b, prize } = machines[i];

    // const n = (prize.x / b.x - prize.y / b.y) / (a.x / b.x - a.y / b.y); // needs floating point threshold comparison
    const n = (prize.x * b.y - prize.y * b.x) / (a.x * b.y - a.y * b.x);
    const m = (prize.y - a.y * n) / b.y;

    const isValid = isValidPressCount(n) && isValidPressCount(m);
    if (!isValid) continue;

    tokensCount += 3 * n + m;
  }

  return tokensCount;
};

export default run;
