import { readData } from './utils';

const puzzles: [number, number, number][] = [
  [1, 1, 2375403],
  [1, 2, 23082277],
  [2, 1, 516],
  [2, 2, 561],
  [3, 1, 160672468],
  [3, 2, 84893551],
  [4, 1, 2639],
  [4, 2, 2005],
  [5, 1, 4774],
  [5, 2, 6004],
  [6, 1, 5318],
  // [6, 2, 1831], // long
  [7, 1, 5702958180383],
  // [7, 2, 92612386119138], // long
  [8, 1, 318],
  [8, 2, 1126],
  // [9, 1, 6288707484810], // long
  // [9, 2, 6311837662089], // long
  [10, 1, 733],
  [10, 2, 1514],
  [11, 1, 186996],
  [11, 2, 221683913164898],
  [12, 1, 1434856],
  [12, 2, 891106],
  [13, 1, 29201],
  [13, 2, 104140871044942],
];

const runPuzzle = async (day: number, part: number) => {
  const d = day.toString().padStart(2, '0');
  const { default: run } = await import(`./src/day-${d}/${part}.js`);
  const data = readData(`./src/day-${d}/data.txt`);
  return run(data);
};

const main = async () => {
  for (let i = 0; i < puzzles.length; ++i) {
    const [day, part, expected] = puzzles[i];
    const result = await runPuzzle(day, part);
    console.log(`${day}-${part}`, result === expected);
  }
};

void main();
