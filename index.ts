import { readData } from './utils';

const year = 2024;

const runPuzzle = async (day: number, part: number) => {
  const d = day.toString().padStart(2, '0');
  const { default: run } = await import(`./src/${year}/day-${d}/${part}.js`);
  const data = readData(`./src/${year}/day-${d}/data.txt`);
  return run(data);
};

const main = async () => {
  const { default: puzzles } = await import(`./src/${year}/index.js`);
  for (let i = 0; i < puzzles.length; ++i) {
    const [day, part, expected] = puzzles[i];
    const result = await runPuzzle(day, part);
    console.log(`${day}-${part}`, result, result === expected);
  }
};

void main();
