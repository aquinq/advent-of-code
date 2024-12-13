import { Coordinates, toMatrix } from '../matrix';

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

const run = (input: string) => {
  const matrix = toMatrix(input);
  const startPosition = matrix.findAll('^')[0];

  const positions: Coordinates[] = [];
  let direction: Direction = '^';
  let position = startPosition;

  while (isInBounds(position, matrix.length)) {
    const isNewPosition = positions.findIndex((value) => value.x === position.x && value.y === position.y) === -1;
    if (isNewPosition) positions.push(position);

    const next = getNext(position, direction);

    if (matrix.at(next.x, next.y) === '#') {
      direction = NEXT_DIRECTION[direction];
    } else {
      position = next;
    }
  }

  return positions.length;
};

export default run;
