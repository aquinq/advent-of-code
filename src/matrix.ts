export type Position = { x: number; y: number };

type Vector = Position;

export type Matrix = ReturnType<typeof toMatrix>;

type Util<T> = (x: number, y: number) => T;

export const identityFn = (a: Position, b: Position) => a.x === b.x && a.y === b.y;

export const toMatrix = (input: string) => {
  const matrix = input.split('\n').map((row) => row.split(''));

  const set = (x: number, y: number, value: string) => {
    matrix[y - 1][x - 1] = value;
  };

  const defineUtil =
    <T>(fn: Util<T>) =>
    (arg1: number | Position, arg2?: number) => {
      const { x, y } = typeof arg1 === 'number' ? { x: arg1, y: arg2! } : arg1;
      return fn(x, y);
    };

  const at = defineUtil<string | undefined>((x, y) => {
    const isOutOfBounds = x < 1 || x > matrix.length || y < 1 || y > matrix.length;
    return isOutOfBounds ? undefined : matrix[y - 1][x - 1];
  });

  const hasPosition = defineUtil<boolean>((x, y) => at(x, y) !== undefined);

  const reducePositions = <T>(fn: (acc: T, cur: string, position: Position) => T, initialValue: T) => {
    let acc: T = initialValue;
    for (let y = 1; y <= matrix.length; ++y) {
      for (let x = 1; x <= matrix.length; ++x) {
        acc = fn(acc, at(x, y)!, { x, y });
      }
    }
    return acc;
  };

  const findAll = (s: string) =>
    reducePositions<Position[]>((acc, cur, position) => {
      return cur === s ? acc.concat(position) : acc;
    }, []);

  return Object.assign(matrix, { at, hasPosition, set, reducePositions, findAll });
};

export const getDistance = (a: Position, b: Position): Vector => ({
  x: b.x - a.x,
  y: b.y - a.y,
});
