const run = (data: string) => {
  const matches = data.match(/mul\(\d{1,3},\d{1,3}\)/g);

  if (matches === null) throw new Error('oh oh, no input matches');

  return matches.reduce((acc, cur) => {
    const values = cur.match(/\d{1,3},\d{1,3}/g);
    if (values === null) throw new Error('oh oh, no match matches');

    const [a, b] = values[0].split(',');

    return acc + Number(a) * Number(b);
  }, 0);
};

export default run;
