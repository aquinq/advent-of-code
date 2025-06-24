import { Matrix, Position, PositionId, toMatrix, toPosition, toPositionId } from '../../utils/matrix';

let matrix: Matrix;

type Region = {
  area: number;
  fences: FenceId[];
};

type PositionData = {
  regionId: number;
  type: string;
  fences: FenceId[];
};

const positionsRecord: Record<PositionId, PositionData> = {};

const positionSort = (a: Position, b: Position) => {
  if (a.y === b.y) return a.x < b.x ? -1 : 1;
  return a.y < b.y ? -1 : 1;
};

type FenceId = `${PositionId}:${PositionId}`;

const toFenceId = (a: Position, b: Position): FenceId => {
  const [first, second] = [a, b].sort(positionSort);
  return `${first.x},${first.y}:${second.x},${second.y}`;
};

const toFencePosition = (id: FenceId): [Position, Position] => {
  const [a, b] = id.split(':');
  return [toPosition(a as PositionId), toPosition(b as PositionId)];
};

const addFence = (position: Position, neighborPosition: Position) => {
  positionsRecord[toPositionId(position)] = {
    ...positionsRecord[toPositionId(position)],
    fences: positionsRecord[toPositionId(position)].fences.concat(toFenceId(position, neighborPosition)),
  };
};

const findNeighbors = (position: Position, regionId: number): void => {
  if (positionsRecord[toPositionId(position)] !== undefined) return;

  const { x, y } = position;
  const plantType = matrix.at(position);

  positionsRecord[toPositionId(position)] = {
    regionId,
    type: plantType!,
    fences: [],
  };

  const neighborPositions: Position[] = [
    { x, y: y + 1 },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x: x - 1, y },
  ];

  for (let i = 0; i < neighborPositions.length; ++i) {
    const neighborPosition = neighborPositions[i];
    const neighborType = matrix.at(neighborPositions[i]);

    if (neighborType === plantType) {
      findNeighbors(neighborPosition, regionId);
    } else {
      addFence(position, neighborPosition);
    }
  }
};

const getRegions = (): Region[] =>
  Object.keys(positionsRecord).reduce<Region[]>((acc, cur) => {
    const { fences, regionId, type } = positionsRecord[cur as PositionId];
    acc[regionId] = {
      area: (acc[regionId]?.area ?? 0) + 1,
      fences: (acc[regionId]?.fences ?? []).concat(fences),
    };
    return acc;
  }, []);

const isNeighborFence = (a: FenceId, b: FenceId) => {
  const [a1, a2] = toFencePosition(a);
  const [b1, b2] = toFencePosition(b);

  /**
   * a1 a2
   * b1 b2
   */
  const c1 =
    a2.x === a1.x + 1 &&
    a2.y === a1.y &&
    b1.x === a1.x &&
    b1.y === a1.y + 1 &&
    b2.x === a1.x + 1 &&
    b2.y === a1.y + 1 &&
    (matrix.at(a1) === matrix.at(b1) || matrix.at(a2) === matrix.at(b2));

  /**
   * b1 b2
   * a1 a2
   */
  const c2 =
    b2.x === b1.x + 1 &&
    b2.y === b1.y &&
    a1.x === b1.x &&
    a1.y === b1.y + 1 &&
    a2.x === b1.x + 1 &&
    a2.y === b1.y + 1 &&
    (matrix.at(a1) === matrix.at(b1) || matrix.at(a2) === matrix.at(b2));

  /**
   * a1 b1
   * a2 b2
   */
  const c3 =
    b1.x === a1.x + 1 &&
    b1.y === a1.y &&
    a2.x === a1.x &&
    a2.y === a1.y + 1 &&
    b2.x === a1.x + 1 &&
    b2.y === a1.y + 1 &&
    (matrix.at(a1) === matrix.at(b1) || matrix.at(a2) === matrix.at(b2));

  /**
   * b1 a1
   * b2 a2
   */
  const c4 =
    a1.x === b1.x + 1 &&
    a1.y === b1.y &&
    b2.x === b1.x &&
    b2.y === b1.y + 1 &&
    a2.x === b1.x + 1 &&
    a2.y === b1.y + 1 &&
    (matrix.at(a1) === matrix.at(b1) || matrix.at(a2) === matrix.at(b2));

  return c1 || c2 || c3 || c4;
};

type Side = FenceId[];

const fenceSort = (a: FenceId, b: FenceId) => {
  const [a1, a2] = toFencePosition(a);
  const [b1, b2] = toFencePosition(b);
  if (a1.y === b1.y) return a1.x < b1.x ? -1 : 1;
  return a1.y < b1.y ? -1 : 1;
};

const getSidesCount = (fences: FenceId[]): number => {
  const sortedFences = fences.sort(fenceSort);

  return sortedFences.reduce<Side[]>((acc, cur, i) => {
    const sideIndex = acc.findIndex((side) => {
      return side.some((fence) => isNeighborFence(cur, fence));
    });
    if (sideIndex === -1) return acc.concat([[cur]]);
    acc[sideIndex].push(cur);
    return acc;
  }, []).length;
};

const run = (data: string) => {
  matrix = toMatrix(data);

  matrix.reducePositions((acc, cur, position, index) => {
    findNeighbors(position, index);
  });

  return getRegions().reduce((acc, { area, fences }) => acc + area * getSidesCount(fences), 0);
};

export default run;
