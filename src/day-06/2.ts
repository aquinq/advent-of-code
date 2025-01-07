import { Matrix, Position, toMatrix } from '../matrix';

type Direction = '^' | '>' | 'v' | '<';

const NEXT_DIRECTION: Record<Direction, Direction> = {
  '^': '>',
  '>': 'v',
  v: '<',
  '<': '^',
};

const getNext = ({ x, y }: Position, direction: Direction) => {
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

const getGuardPositions = (matrix: Matrix, startPosition: Position, init = false) => {
  const allGuardPositions: GuardPosition[] = [];
  const identityFn =
    ({ x, y }: Position, direction: Direction) =>
    (position: GuardPosition) =>
      position.value.x === x && position.value.y === y && (init || position.direction === direction);

  let direction: Direction = '^';
  let position = startPosition;

  while (matrix.hasPosition(position)) {
    const isNewPosition = allGuardPositions.findIndex(identityFn(position, direction)) === -1;
    if (isNewPosition) {
      allGuardPositions.push({ value: position, direction });
    } else {
      if (!init) {
        throw new Error('loop!');
      }
    }

    const next = getNext(position, direction);

    if (matrix.at(next) === '#') {
      direction = NEXT_DIRECTION[direction];
    } else {
      position = next;
    }
  }

  return allGuardPositions;
};

type GuardPosition = {
  value: Position;
  direction: Direction;
};

const run = (data: string) => {
  const matrix = toMatrix(data);
  const startPosition = matrix.findAll('^')[0];

  const allGuardPositions = getGuardPositions(matrix, startPosition, true);
  const positions = allGuardPositions.slice(1); // start position is not available.
  const loopingObstaclePositions: GuardPosition[] = [];

  positions.forEach((position, i) => {
    console.log({ i });
    const {
      value: { x, y },
    } = position;
    const newMatrix = toMatrix(data);
    newMatrix.set(x, y, '#');

    try {
      getGuardPositions(newMatrix, startPosition);
    } catch (error) {
      if ((error as Error).message === 'loop!') {
        loopingObstaclePositions.push(position);
      }
    }
  });

  return loopingObstaclePositions.length;
};

export default run;
