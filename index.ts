import { readData } from './utils';

const [day, part] = [12, 2];

const main = async () => {
  const d = day.toString().padStart(2, '0');
  const { default: run } = await import(`./src/day-${d}/${part}.js`);
  const data = readData(`./src/day-${d}/data.txt`);
  const result = run(data);
  console.log(result);
};

void main();
