import { Position, generateMatrix } from '../../utils/matrix';
import { parseData } from './utils';

type Velocity = Position;

type Robot = {
  p: Position;
  v: Velocity;
};

const width = 101;
const height = 103;

const generateBathroom = () => {
  const fill: Velocity[] = [];
  return generateMatrix({ width, height, fill });
};

let matrix = generateBathroom();

const run = (data: string) => {
  const robots: Robot[] = parseData(data);

  for (let i = 0; i < robots.length; ++i) {
    const {
      p: { x, y },
      v,
    } = robots[i];
    matrix.set(x, y, matrix.at(x, y)!.concat(v));
  }

  for (let i = 0; i < 100; ++i) {
    const newMatrix = generateBathroom();

    matrix = matrix.reducePositions((acc, cur, position) => {
      for (let j = 0; j < cur.length; ++j) {
        const robotV = cur[j];
        const nextX = (position.x + robotV.x) % width;
        const nextY = (position.y + robotV.y) % height;
        const nextPosition: Position = {
          x: nextX < 0 ? nextX + width : nextX,
          y: nextY < 0 ? nextY + height : nextY,
        };
        acc.set(nextPosition.x, nextPosition.y, acc.at(nextPosition)!.concat(robotV));
      }
      return acc;
    }, newMatrix);
  }

  const total = matrix.reducePositions(
    (acc, cur, position) => {
      const quadrantId = (() => {
        if (position.x < 50 && position.y < 51) return '_1';
        if (position.x > 50 && position.y < 51) return '_2';
        if (position.x < 50 && position.y > 51) return '_3';
        if (position.x > 50 && position.y > 51) return '_4';
      })();
      if (!quadrantId) return acc;
      acc[quadrantId!] += cur.length;
      return acc;
    },
    {
      _1: 0,
      _2: 0,
      _3: 0,
      _4: 0,
    },
  );

  return total._1 * total._2 * total._3 * total._4;
};

export default run;
