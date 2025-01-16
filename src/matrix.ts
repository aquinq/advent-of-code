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

export type Matrix<T = string> = ReturnType<typeof toMatrix<T>>;

type MatrixValue<T> = T[][] & {
  width: number;
  height: number;
};

type Util<T> = (x: number, y: number) => T;

export const identityFn = (a: Position, b: Position) => a.x === b.x && a.y === b.y;

export const toMatrix = <T = string>(input: string, fill?: T) => {
  const _2DArray = input.split('\n').map((row) => {
    const line = row.split('');
    if (fill) return line.map(() => fill);
    return line;
  });

  const matrix: MatrixValue<T> = Object.defineProperties(_2DArray, {
    width: {
      value: _2DArray[0].length,
      writable: false,
    },
    height: {
      value: _2DArray.length,
      writable: false,
    },
  }) as MatrixValue<T>;

  const defineUtil =
    <T>(fn: Util<T>) =>
    (arg1: number | Position, arg2?: number) => {
      const { x, y } = typeof arg1 === 'number' ? { x: arg1, y: arg2! } : arg1;
      return fn(x, y);
    };

  const set = (x: number, y: number, value: T) => {
    matrix[y][x] = value;
  };

  const at = defineUtil<T | undefined>((x, y) => {
    const isOutOfBounds = x < 0 || x > matrix.width - 1 || y < 0 || y > matrix.height - 1;
    return isOutOfBounds ? undefined : matrix[y][x];
  });

  const hasPosition = defineUtil<boolean>((x, y) => at(x, y) !== undefined);

  const reducePositions = <R = undefined>(
    fn: (acc: R, cur: T, position: Position, index: number) => R | void,
    initialValue?: R,
  ) => {
    let acc: R = initialValue as R;
    let index = 0;
    for (let y = 0; y < matrix.height; ++y) {
      for (let x = 0; x < matrix.width; ++x) {
        acc = fn(acc, at(x, y)!, { x, y }, index++) ?? acc;
      }
    }
    return acc;
  };

  const findAll = (value: T) =>
    reducePositions<Position[]>((acc, cur, position) => {
      return cur === value ? acc.concat(position) : acc;
    }, []);

  return Object.assign(matrix, { at, hasPosition, set, reducePositions, findAll });
};

export const getDistance = (a: Position, b: Position): Vector => ({
  x: b.x - a.x,
  y: b.y - a.y,
});

export const generateMatrix = <T>({ width, height, fill }: { width: number; height: number; fill?: T }) => {
  let s = '';

  for (let i = 0; i < height; ++i) {
    if (i > 0) s += '\n';
    s += '.'.repeat(width);
  }

  return toMatrix(s, fill);
};
