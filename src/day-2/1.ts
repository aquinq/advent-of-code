import { parseData } from './utils';

export const isSafe = (array: number[], direction?: 'asc' | 'desc'): boolean => {
	if (array.length === 1) return true;

	const a = array[0];
	const b = array[1];
	const diff = b - a;
	const currentDirection = diff > 0 ? 'asc' : 'desc';

	const isWithinRange = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
	const hasCorrectDirection = !direction || direction === currentDirection;
	const passes = isWithinRange && hasCorrectDirection;

	return passes ? isSafe(array.slice(1), currentDirection) : false;
};

const run = (data: string) => {
	const input = parseData(data);

	return input.reduce((acc, cur) => {
		return isSafe(cur) ? acc + 1 : acc;
	}, 0);
};

export default run;
