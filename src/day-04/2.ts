import { Matrix, type Position, toMatrix } from '../matrix';

const isXMAS = ({ x, y }: Position, at: Matrix['at']): boolean => {
  const startLetter = at(x, y);
  if (startLetter !== 'A') throw new Error(`Unexpected ${startLetter} at position ${x}, ${y}`);

  const cornerLetters = [at(x - 1, y - 1), at(x + 1, y - 1), at(x + 1, y + 1), at(x - 1, y + 1)];

  const validOrders = ['M,M,S,S', 'M,S,S,M', 'S,M,M,S', 'S,S,M,M'];

  return validOrders.includes(cornerLetters.toString());
};

const run = (data: string) => {
  const matrix = toMatrix(data);
  const matrixSize = matrix.length;

  const startPosition = matrix.findAll('A');

  const validatePositions = ({ x, y }: Position): boolean =>
    x >= 2 && x <= matrixSize - 1 && y >= 2 && y <= matrixSize - 1;

  const validPositions = startPosition.filter(validatePositions);

  return validPositions.reduce((acc, cur) => {
    const passes = isXMAS(cur, matrix.at);
    return passes ? acc + 1 : acc;
  }, 0);
};

export default run;
