import { readData } from './utils';

const [day, part] = [8, 2];

const main = async () => {
  const { default: run } = await import(`./src/day-${day}/${part}.js`);
  const data = readData(`./src/day-${day}/data.txt`);
  const result = run(data);
  console.log(result);
};

void main();
