import fs from 'node:fs';

export const readData = (path: string) => {
  const data = fs.readFileSync(path);
  return data.toString();
};
