export const parser = (data: string) => {
  const [orderingRules, updates] = data.split('\n\n');
  return [orderingRules.split('\n'), updates.split('\n')];
};
