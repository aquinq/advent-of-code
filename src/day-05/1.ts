import { parser } from './parser';

export const toOrderingRule = (a: string, b: string) => `${a}|${b}`;

const run = (data: string) => {
  const [orderingRules, updates] = parser(data);

  const validMiddlePages: string[] = [];

  for (let i = 0; i < updates.length; ++i) {
    const update = updates[i].split(',');
    let validPagesCount = 0;

    for (let j = 0; j < update.length; ++j) {
      const prev = update.slice(0, j);
      const page = update[j];
      const next = update.slice(j + 1);

      const expectedRules = [
        ...prev.map((prevPage) => toOrderingRule(prevPage, page)),
        ...next.map((nextPage) => toOrderingRule(page, nextPage)),
      ];

      const orderingRulesOrder = orderingRules.filter((item) => expectedRules.includes(item));
      if (expectedRules.length === orderingRulesOrder.length) ++validPagesCount;
    }

    if (validPagesCount === update.length) validMiddlePages.push(update[(update.length - 1) / 2]);
  }

  return validMiddlePages.reduce((acc, cur) => acc + Number(cur), 0);
};

export default run;
