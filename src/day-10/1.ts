import { uniqBy } from '../array';
import { Position } from '../matrix';

// First result of part 1 was in fact the result of part 2 😄
import { getAllTrails } from './2';

type Trail = {
  start: Position;
  end: Position;
};

const identityFn = (a: Trail, b: Trail) =>
  a.start.x === b.start.x && a.start.y === b.start.y && a.end.x === b.end.x && a.end.y === b.end.y;

const run = (data: string) => {
  const trails = getAllTrails(data);
  return uniqBy(trails, identityFn).length;
};

export default run;
