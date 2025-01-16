import { Position, generateMatrix } from '../matrix';
import { parseData } from './utils';

type Velocity = Position;

type Robot = {
  p: Position;
  v: Velocity;
};

const width = 101;
const height = 103;

const middleX = 50;
const middleY = 51;

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

  let seconds = 0;

  while (true) {
    const newMatrix = generateBathroom();
    let allRobotsHaveUniquePosition = true;

    matrix = matrix.reducePositions((acc, cur, position) => {
      for (let j = 0; j < cur.length; ++j) {
        const robotV = cur[j];
        const nextX = (position.x + robotV.x) % width;
        const nextY = (position.y + robotV.y) % height;
        const nextPosition: Position = {
          x: nextX < 0 ? nextX + width : nextX,
          y: nextY < 0 ? nextY + height : nextY,
        };
        const existingRobots = acc.at(nextPosition)!;
        if (existingRobots.length > 0) allRobotsHaveUniquePosition = false;
        acc.set(nextPosition.x, nextPosition.y, existingRobots.concat(robotV));
      }
      return acc;
    }, newMatrix);

    seconds += 1;

    if (allRobotsHaveUniquePosition) return seconds;
  }
};

export default run;
