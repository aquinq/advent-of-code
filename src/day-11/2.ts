type StonesRecord = Record<string, number>;

const run = (data: string) => {
  let stonesRecord = data.split(' ').reduce<StonesRecord>(
    (acc, stone) => ({
      ...acc,
      [stone]: (acc[stone] ?? 0) + 1,
    }),
    {},
  );

  for (let i = 0; i < 75; ++i) {
    console.log({ i });
    const stones = Object.keys(stonesRecord);
    const newStonesRecord: StonesRecord = {};

    for (let j = 0; j < stones.length; ++j) {
      const stone = stones[j];
      let newStones: string[] = [];

      if (stone === '0') {
        newStones = ['1'];
      } else if (stone.length % 2 === 0) {
        newStones = [stone.substring(0, stone.length / 2), Number(stone.substring(stone.length / 2)).toString()];
      } else {
        newStones = [(Number(stone) * 2024).toString()];
      }

      newStones.forEach((newStone) => {
        newStonesRecord[newStone] = (newStonesRecord[newStone] ?? 0) + stonesRecord[stone];
      });
    }

    stonesRecord = newStonesRecord;
  }

  return Object.values(stonesRecord).reduce((acc, cur) => acc + cur, 0);
};

export default run;
