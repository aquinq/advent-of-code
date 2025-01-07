import { toOrderingRule } from './1';
import { parser } from './parser';

const run = (data: string) => {
  const [orderingRules, updates] = parser(data);

  const fixedUpdates: string[][] = [];

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

    if (validPagesCount === update.length) continue;

    const validUpdate = update.sort((a, b) => {
      const rule = orderingRules.find((item) => item === toOrderingRule(a, b) || item === toOrderingRule(b, a))!;
      const [first] = rule.split('|');
      return first === a ? -1 : 1;
    });

    fixedUpdates.push(validUpdate);
  }

  return fixedUpdates.reduce((acc, cur) => {
    const middle = cur[(cur.length - 1) / 2];
    return acc + Number(middle);
  }, 0);
};

export default run;
