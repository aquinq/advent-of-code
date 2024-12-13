import { type Coordinates, Matrix, toMatrix } from '../matrix';

const isXMAS = ({ x, y }: Coordinates, at: Matrix['at']): boolean => {
  const startLetter = at(x, y);
  if (startLetter !== 'A') throw new Error(`Unexpected ${startLetter} at position ${x}, ${y}`);

  const cornerLetters = [at(x - 1, y - 1), at(x + 1, y - 1), at(x + 1, y + 1), at(x - 1, y + 1)];

  const validOrders = ['M,M,S,S', 'M,S,S,M', 'S,M,M,S', 'S,S,M,M'];

  return validOrders.includes(cornerLetters.toString());
};

const run = (input: string) => {
  const matrix = toMatrix(input);
  const matrixSize = matrix.length;

  const startCoordinates = matrix.findAll('A');

  const validateCoordinates = ({ x, y }: Coordinates): boolean =>
    x >= 2 && x <= matrixSize - 1 && y >= 2 && y <= matrixSize - 1;

  const validCoordinates = startCoordinates.filter(validateCoordinates);

  return validCoordinates.reduce((acc, cur) => {
    const passes = isXMAS(cur, matrix.at);
    return passes ? acc + 1 : acc;
  }, 0);
};

export default run;
