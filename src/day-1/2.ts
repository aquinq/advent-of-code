import { parseData } from './utils';

const getOccurences = (array: number[]) =>
	array.reduce<Record<number, number>>((acc, cur) => {
		const count = acc[cur] ?? 0;
		return {
			...acc,
			[cur]: count + 1,
		};
	}, {});

const run = (data: string) => {
	const [a, b] = parseData(data);
	const bOccurences = getOccurences(b);

	return a.reduce<number>((acc, cur) => {
		const occurences = bOccurences[cur] ?? 0;
		return acc + cur * occurences;
	}, 0);
};

export default run;
