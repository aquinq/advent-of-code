import { Matrix, Position, getDistance, toMatrix } from '../matrix';

let matrix: Matrix;

type PositionsByNodeType = Record<string, Position[]>;

const getPositionsByNodeType = (matrix: Matrix): PositionsByNodeType =>
  matrix.reducePositions<PositionsByNodeType>((acc, cur, position) => {
    if (cur === '.') return acc;
    return {
      ...acc,
      [cur]: (acc[cur] ?? []).concat(position),
    };
  }, {});

const identityFn =
  (antinode: Position) =>
  ({ x, y }: Position) =>
    antinode.x === x && antinode.y === y;

/**
 * Returns antinode of a by b.
 */
const getAntinode = (a: Position, b: Position): Position => {
  const distance = getDistance(a, b);
  const antinode: Position = {
    x: b.x + distance.x,
    y: b.y + distance.y,
  };

  return antinode;
};

const getAntinodesOf = (a: Position, rest: Position[]): Position[] => {
  const antinodes: Position[] = [];

  for (let i = 0; i < rest.length; ++i) {
    const b = rest[i];
    const antinode = getAntinode(a, b);
    if (matrix.hasPosition(antinode)) antinodes.push(antinode);
  }

  return antinodes;
};

const getAntinodes = (positions: Position[]): Position[] => {
  const antinodes: Position[] = [];

  for (let i = 0; i < positions.length; ++i) {
    const node = positions[i];
    const rest = positions.filter((_, index) => index !== i);
    antinodes.push(...getAntinodesOf(node, rest));
  }

  return antinodes;
};

const run = (data: string) => {
  matrix = toMatrix(data);

  const antinodes: Position[] = [];

  const positionsByNodeType = getPositionsByNodeType(matrix);
  Object.values(positionsByNodeType).forEach((nodesOfSameType) => {
    antinodes.push(...getAntinodes(nodesOfSameType));
  });

  const uniqAntinodes = antinodes.filter((antinode, index) => antinodes.findIndex(identityFn(antinode)) === index);
  return uniqAntinodes.length;
};

export default run;
