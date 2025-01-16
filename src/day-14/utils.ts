import { toXY } from '../string';

export const parseData = (data: string) =>
  data.split('\n').map((robot) => {
    const [p, v] = robot.split(' ');
    const [p_x, p_y] = toXY(p);
    const [v_x, v_y] = toXY(v);
    return {
      p: {
        x: p_x,
        y: p_y,
      },
      v: {
        x: v_x,
        y: v_y,
      },
    };
  });
