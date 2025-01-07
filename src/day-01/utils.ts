export const parseData = (input: string) =>
  input.split('\n').reduce<[number[], number[]]>(
    (acc, cur) => {
      const [a, b] = cur.split('   ');
      return [acc[0].concat(Number(a)), acc[1].concat(Number(b))];
    },
    [[], []],
  );
