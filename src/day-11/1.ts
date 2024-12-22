// Same code but 25x slower.
const blinkSlow = (stones: number[]) =>
  stones.reduce<number[]>((acc, cur) => {
    if (cur === 0) return acc.concat(1);
    const s = cur.toString();
    if (s.length % 2 === 0) return acc.concat(Number(s.substring(0, s.length / 2)), Number(s.substring(s.length / 2)));
    return acc.concat(cur * 2024);
  }, []);

const blinkFast = (stones: number[]): number[] => {
  const newArrangement: number[] = [];

  for (let i = 0; i < stones.length; ++i) {
    const stone = stones[i];
    if (stone === 0) {
      newArrangement.push(1);
    } else {
      const s = stone.toString();
      if (s.length % 2 === 0) {
        const power = 10 ** (s.length / 2);
        newArrangement.push(Math.trunc(stone / power), Math.trunc(stone % power));
      } else {
        newArrangement.push(stone * 2024);
      }
    }
  }

  return newArrangement;
};

const run = (data: string) => {
  let stones = data.split(' ').map(Number);

  for (let i = 0; i < 25; ++i) {
    console.log({ i });
    stones = blinkFast(stones);
  }

  return stones.length;
};

export default run;
