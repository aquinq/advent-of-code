import { isSafe } from './1';
import { parseData } from './utils';

const isSafeEnough = (array: number[]) => {
	for (let index = 0; index < array.length; ++index) {
		const newArray = array.filter((_, i) => i !== index);
		if (isSafe(newArray)) return true;
	}

	return false;
};

const run = (data: string) => {
	const input = parseData(data);

	const safeIndexes = input.reduce((acc, cur, i) => {
		return isSafe(cur) ? acc.concat(i) : acc;
	}, []);

	const rest = input.filter((_, i) => !safeIndexes.includes(i));

	const safeEnoughIndexes = rest.reduce((acc, cur, i) => {
		return isSafeEnough(cur) ? acc.concat(i) : acc;
	}, safeIndexes);

	return safeEnoughIndexes.length;
};

export default run;
