import { parseData } from './utils';

const testKey = (lockHeights: number[], keyHeights: number[]) =>
  lockHeights.every((lockHeight, index) => lockHeight + keyHeights[index] <= 7);

const run = (data: string) => {
  let matchesCount = 0;
  const [locks, keys] = parseData(data);

  const locksHeights = locks.map((lock) =>
    lock.reducePositions<number[]>((acc, cur, { x, y }) => {
      if (cur === '#') acc[x] = (acc[x] ?? 0) + 1;
      return acc;
    }, []),
  );

  const keysHeights = keys.map((key) =>
    key.reducePositions<number[]>((acc, cur, { x, y }) => {
      if (cur === '#') acc[x] = (acc[x] ?? 0) + 1;
      return acc;
    }, []),
  );

  for (let i = 0; i < locksHeights.length; i++) {
    const lockHeights = locksHeights[i];
    for (let j = 0; j < keysHeights.length; ++j) {
      const keyHeights = keysHeights[j];
      const matches = testKey(lockHeights, keyHeights);
      if (matches) matchesCount += 1;
    }
  }

  return matchesCount;
};

export default run;
