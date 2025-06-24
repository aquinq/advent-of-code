import { toXY } from '../../utils/string';

export const parseData = (data: string, part = 1) =>
  data.split('\n\n').map((machine) => {
    const [a, b, prize] = machine.split('\n');
    const [a_x, a_y] = toXY(a);
    const [b_x, b_y] = toXY(b);
    const [prize_x, prize_y] = toXY(prize);

    const unitOffset = part === 1 ? 0 : 10_000_000_000_000;

    return {
      a: {
        x: a_x,
        y: a_y,
      },
      b: {
        x: b_x,
        y: b_y,
      },
      prize: {
        x: prize_x + unitOffset,
        y: prize_y + unitOffset,
      },
    };
  });
