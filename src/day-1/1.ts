import { parseData } from './utils';

const run = (data: string) => {
	const [a, b] = parseData(data);
	const sorted_a = a.sort();
	const sorted_b = b.sort();

	return sorted_a.reduce<number>((acc, cur, i) => acc + Math.abs(sorted_b[i] - sorted_a[i]), 0);
};

export default run;
