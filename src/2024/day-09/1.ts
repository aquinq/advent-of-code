const flattenDiskMap = (map: string[]) =>
  map.reduce<string[]>((acc, cur, i) => {
    const isDiskSpace = i % 2 === 1;
    const value = isDiskSpace ? '.' : `${i / 2}`;
    return acc.concat(Array(Number(cur)).fill(value));
  }, []);

const run = (data: string) => {
  const diskMap = data.split('');
  const flatDiskMap = flattenDiskMap(diskMap);

  for (let i = flatDiskMap.length - 1; i >= 0; --i) {
    const element = flatDiskMap.at(i)!;
    if (element === '.') continue;

    const firstFreeSpaceIndex = flatDiskMap.findIndex((entry) => entry === '.');
    if (firstFreeSpaceIndex > i) break;

    flatDiskMap[firstFreeSpaceIndex] = element;
    flatDiskMap[i] = '.';
  }

  return flatDiskMap.reduce((acc, cur, i) => {
    return cur === '.' ? acc : acc + Number(cur) * i;
  }, 0);
};

export default run;
