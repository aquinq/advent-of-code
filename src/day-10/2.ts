import { Matrix, Position, toMatrix } from '../matrix';

let matrix: Matrix;

type Trail = {
  start: Position;
  end: Position;
};

const getReachable9s = (position: Position): Position[] => {
  const height = Number(matrix.at(position)!);
  if (height === 9) return [position];

  const trails: Position[] = [];

  const nextPositions: Position[] = [
    { x: position.x, y: position.y - 1 },
    { x: position.x + 1, y: position.y },
    { x: position.x, y: position.y + 1 },
    { x: position.x - 1, y: position.y },
  ];

  for (let i = 0; i < nextPositions.length; i++) {
    const next = nextPositions[i];
    if (!matrix.hasPosition(next)) continue;

    const nextHeight = Number(matrix.at(next)!);
    if (nextHeight === height + 1) {
      trails.push(...getReachable9s(next));
    }
  }

  return trails;
};

export const getAllTrails = (data: string) => {
  matrix = toMatrix(data);

  const trails: Trail[] = [];
  const startPositions = matrix.findAll('0');

  for (let i = 0; i < startPositions.length; i++) {
    const startPosition = startPositions[i];
    const reachable9s = getReachable9s(startPosition);
    trails.push(...reachable9s.map((item) => ({ start: startPosition, end: item })));
  }

  return trails;
};

const run = (data: string) => {
  const trails = getAllTrails(data);
  return trails.length;
};

export default run;
