export const toXY = (s: string) => s.match(/-?\d+/g)!.map(Number);
