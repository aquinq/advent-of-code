// Very poor performance, string mutations would probably be much faster, compared to current solution with arrays.
const groupFlattenDiskMap = (map: string[]) => {
  const flatDiskMap = map.reduce<string[]>((acc, cur, i) => {
    const isDiskSpace = i % 2 === 1;
    const value = isDiskSpace ? '.' : `${i / 2}`;
    return acc.concat(Array(Number(cur)).fill(value));
  }, []);

  const groupedFlatDiskMap: string[][] = [];

  for (let i = 0; i < flatDiskMap.length; ++i) {
    const element = flatDiskMap[i];
    const lastGroupIndex = Math.max(0, groupedFlatDiskMap.length - 1);
    const lastGroup = groupedFlatDiskMap[lastGroupIndex];

    if (lastGroup?.includes(element)) {
      groupedFlatDiskMap[lastGroupIndex].push(element);
    } else {
      groupedFlatDiskMap.push([element]);
    }
  }

  return groupedFlatDiskMap;
};

const isFreeSpaceGroup = (group: string[]) => group.every((item) => item === '.');

const run = (data: string) => {
  const diskMap = data.split('');
  const groupedFlatDiskMap = groupFlattenDiskMap(diskMap);

  for (let index = 1; index <= groupedFlatDiskMap.length; ++index) {
    console.log({ index });

    const currentGroupIndex = groupedFlatDiskMap.length - index;
    const currentGroup = groupedFlatDiskMap.at(currentGroupIndex)!;
    if (isFreeSpaceGroup(currentGroup)) continue;

    const firstFreeSpaceGroupIndex = groupedFlatDiskMap.findIndex(
      (group) => group.length >= currentGroup.length && isFreeSpaceGroup(group),
    );
    if (firstFreeSpaceGroupIndex === -1 || firstFreeSpaceGroupIndex >= currentGroupIndex) continue;

    const firstFreeSpaceGroup = groupedFlatDiskMap[firstFreeSpaceGroupIndex];

    const freeSpaceUsed = firstFreeSpaceGroup.slice(0, currentGroup.length);
    const freeSpaceLeft = firstFreeSpaceGroup.slice(currentGroup.length);

    groupedFlatDiskMap[firstFreeSpaceGroupIndex] = currentGroup;
    groupedFlatDiskMap[currentGroupIndex] = freeSpaceUsed;

    // Concatenate next group if it is a free space group.
    const nextGroup = groupedFlatDiskMap[currentGroupIndex + 1];
    if (nextGroup && isFreeSpaceGroup(nextGroup)) {
      groupedFlatDiskMap.splice(currentGroupIndex, 2, groupedFlatDiskMap[currentGroupIndex].concat(nextGroup));
      --index;
    }

    // Concatenate prev group if it is a free space group.
    const previousGroup = groupedFlatDiskMap[currentGroupIndex - 1];
    if (previousGroup && isFreeSpaceGroup(previousGroup)) {
      groupedFlatDiskMap.splice(currentGroupIndex - 1, 2, groupedFlatDiskMap[currentGroupIndex].concat(previousGroup));
      --index;
    }

    if (freeSpaceLeft.length > 0) {
      groupedFlatDiskMap.splice(firstFreeSpaceGroupIndex + 1, 0, freeSpaceLeft);
    }
  }

  return groupedFlatDiskMap.flat().reduce((acc, cur, i) => {
    return cur === '.' ? acc : acc + Number(cur) * i;
  }, 0);
};

export default run;
