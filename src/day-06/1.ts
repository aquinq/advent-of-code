import { Position, toMatrix } from '../matrix';

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

const identityFn =
  (position: Position) =>
  ({ x, y }: Position) =>
    position.x === x && position.y === y;

const run = (data: string) => {
  const matrix = toMatrix(data);
  const startPosition = matrix.findAll('^')[0];

  const positions: Position[] = [];
  let direction: Direction = '^';
  let position = startPosition;

  while (matrix.hasPosition(position)) {
    const isNewPosition = positions.findIndex(identityFn(position)) === -1;
    if (isNewPosition) positions.push(position);

    const next = getNext(position, direction);

    if (matrix.at(next) === '#') {
      direction = NEXT_DIRECTION[direction];
    } else {
      position = next;
    }
  }

  return positions.length;
};

export default run;
