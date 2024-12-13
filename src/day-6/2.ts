import { Coordinates, Matrix, toMatrix } from '../matrix';

type Direction = '^' | '>' | 'v' | '<';

const NEXT_DIRECTION: Record<Direction, Direction> = {
  '^': '>',
  '>': 'v',
  v: '<',
  '<': '^',
};

const isInBounds = ({ x, y }: Coordinates, matrixSize: number) =>
  x >= 1 && x <= matrixSize && y >= 1 && y <= matrixSize;

const getNext = ({ x, y }: Coordinates, direction: Direction) => {
  switch (direction) {
    case '^':
      return { x, y: y - 1 };
    case '>':
      return { x: x + 1, y };
    case 'v':
      return { x, y: y + 1 };
    default:
      // '<'
      return { x: x - 1, y };
  }
};

const getPositions = (matrix: Matrix, startPosition: Coordinates, init = false) => {
  const allPositions: Position[] = [];
  const identityFn =
    ({ x, y }: Coordinates, direction: Direction) =>
    (position: Position) =>
      position.value.x === x && position.value.y === y && (init || position.direction === direction);

  let direction: Direction = '^';
  let position = startPosition;

  while (isInBounds(position, matrix.length)) {
    const isNewPosition = allPositions.findIndex(identityFn(position, direction)) === -1;
    if (isNewPosition) {
      allPositions.push({ value: position, direction });
    } else {
      if (!init) {
        throw new Error('loop!');
      }
    }

    const next = getNext(position, direction);

    if (matrix.at(next.x, next.y) === '#') {
      direction = NEXT_DIRECTION[direction];
    } else {
      position = next;
    }
  }

  return allPositions;
};

type Position = {
  value: Coordinates;
  direction: Direction;
};

const run = (input: string) => {
  const matrix = toMatrix(input);
  const startPosition = matrix.findAll('^')[0];

  const allPositions = getPositions(matrix, startPosition, true);
  const positions = allPositions.slice(1); // start position is not available.
  const loopingObstaclePositions: Position[] = [];

  positions.forEach((position, i) => {
    console.log({ i });
    const {
      value: { x, y },
    } = position;
    const newMatrix = toMatrix(input);
    newMatrix.set(x, y, '#');

    try {
      getPositions(newMatrix, startPosition);
    } catch (error) {
      if ((error as Error).message === 'loop!') {
        loopingObstaclePositions.push(position);
      }
    }
  });

  return loopingObstaclePositions.length;
};

export default run;
