export const uniq = <T>(array: T[]) => array.filter((a, index) => array.findIndex((b) => a === b) === index);

export const uniqBy = <T>(array: T[], predicate: (a: T, b: T) => boolean) =>
  array.filter((a, index) => array.findIndex((b) => predicate(a, b)) === index);

export const hash = (array: string[]) => array.toString();
