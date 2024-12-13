export const parseData = (input: string) =>
	input.split('\n').reduce<number[][]>((acc, cur) => {
		return acc.concat([cur.split(' ').map(Number)]);
	}, []);
