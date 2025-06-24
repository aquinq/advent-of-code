import partition from 'lodash/partition';
import { toMatrix } from '../../utils/matrix';

export const parseData = (data: string) => {
  const schematics = data.split('\n\n').map((schematic) => toMatrix(schematic));
  return partition(schematics, (schematic) => schematic.at(0, 0) === '#');
};
