export type Coordinates = { x: number; y: number };

export type Matrix = ReturnType<typeof toMatrix>;

export const toMatrix = (input: string) => {
	const matrix = input.split('\n').map((row) => row.split(''));

	const at = (x: number, y: number) => matrix[y - 1][x - 1];
	const set = (x: number, y: number, value: string) => {
		matrix[y - 1][x - 1] = value;
	};

	const findAll = (s: string) =>
		matrix.reduce<Coordinates[]>((acc, cur, y) => {
			return acc.concat(
				cur.reduce<Coordinates[]>((acc2, cur2, x) => {
					return cur2 === s ? acc2.concat([{ x: x + 1, y: y + 1 }]) : acc2;
				}, []),
			);
		}, []);

	return Object.assign(matrix, { at, set, findAll });
};

export class Matrix2D {
	// TODO : test if class is faster
	private _matrix: string[][];

	constructor(input: string) {
		this._matrix = input.split('\n').map((row) => row.split(''));
	}

	public get() {
		return this._matrix;
	}

	public at(x: number, y: number) {
		return this._matrix[y - 1][x - 1];
	}

	public set(x: number, y: number, value: string) {
		this._matrix[y - 1][x - 1] = value;
		return this._matrix;
	}

	public findAll(value: string): Coordinates[] {
		return this._matrix.reduce<Coordinates[]>((acc, cur, y) => {
			return acc.concat(
				cur.reduce<Coordinates[]>((acc2, cur2, x) => {
					return cur2 === value ? acc2.concat([{ x: x + 1, y: y + 1 }]) : acc2;
				}, []),
			);
		}, []);
	}
}
