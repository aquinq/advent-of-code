export type Position = { x: number; y: number };

export type PositionId = `${string},${string}`;

export const toPositionId = ({ x, y }: Position): PositionId => `${x},${y}`;

export const toPosition = (id: PositionId): Position => {
  const [x, y] = id.split(',');
  return {
    x: Number(x),
    y: Number(y),
  };
};

type Vector = Position;

export type Matrix = ReturnType<typeof toMatrix>;

type MatrixValue = string[][] & {
  width: number;
  height: number;
};

type Util<T> = (x: number, y: number) => T;

export const identityFn = (a: Position, b: Position) => a.x === b.x && a.y === b.y;

export const toMatrix = (input: string) => {
  const _2DArray = input.split('\n').map((row) => row.split(''));
  const matrix: MatrixValue = Object.defineProperties(_2DArray, {
    width: {
      value: _2DArray[0].length,
      writable: false,
    },
    height: {
      value: _2DArray.length,
      writable: false,
    },
  }) as MatrixValue;

  const set = (x: number, y: number, value: string) => {
    matrix[y][x] = value;
  };

  const defineUtil =
    <T>(fn: Util<T>) =>
    (arg1: number | Position, arg2?: number) => {
      const { x, y } = typeof arg1 === 'number' ? { x: arg1, y: arg2! } : arg1;
      return fn(x, y);
    };

  const at = defineUtil<string | undefined>((x, y) => {
    const isOutOfBounds = x < 0 || x > matrix.length - 1 || y < 0 || y > matrix.length - 1;
    return isOutOfBounds ? undefined : matrix[y][x];
  });

  const hasPosition = defineUtil<boolean>((x, y) => at(x, y) !== undefined);

  const reducePositions = <T = undefined>(
    fn: (acc: T, cur: string, position: Position, index: number) => T | void,
    initialValue?: T,
  ) => {
    let acc: T = initialValue as T;
    let index = 0;
    for (let y = 0; y <= matrix.width - 1; ++y) {
      for (let x = 0; x <= matrix.height - 1; ++x) {
        acc = fn(acc, at(x, y)!, { x, y }, index++) ?? acc;
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
