import { EmptyEquation, parseData, toNBaseArray } from './utils';

type Operator = '+' | '*';

const OperatorsByBit: Record<number, Operator> = {
	0: '+',
	1: '*',
};

const getOperators = (n: number, length: number): Operator[] => {
	const bitsArray = toNBaseArray(n, length, 2);
	return bitsArray.map((bit) => OperatorsByBit[bit]);
};

const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;

const fnByOp: Record<Operator, typeof add | typeof multiply> = {
	'+': add,
	'*': multiply,
};

const compute = (a: number, b: number, operator: Operator) => fnByOp[operator](a, b);

const computeOperands = ([a, b, ...rest]: number[], operators: Operator[]): number => {
	const result = compute(a, b, operators[0]);

	return rest.length === 0 ? result : computeOperands([result, ...rest], operators.slice(1));
};

const isValidEquation = ({ result, operands }: EmptyEquation) => {
	const operatorsLength = operands.length - 1;
	const permutationsCount = 2 ** operatorsLength;

	for (let i = 0; i < permutationsCount; i += 1) {
		const operators = getOperators(i, operatorsLength);
		if (computeOperands(operands, operators) === result) return true;
	}

	return false;
};

const run = (input: string) => {
	const emptyEquations: EmptyEquation[] = parseData(input);

	return emptyEquations.reduce((acc, cur, i) => {
		console.log({ i });
		return isValidEquation(cur) ? acc + cur.result : acc;
	}, 0);
};

export default run;
