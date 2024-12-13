import mul from './1';

const run = (input: string) => {
	const dos = input.split('do()');

	return dos.reduce((acc, cur) => {
		const d = cur.split("don't()")[0];
		return acc + mul(d);
	}, 0);
};

export default run;
