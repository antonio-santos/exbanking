export const roundTo = (num: number, places: number) => {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

export const add = (currenctAmount: number, amountToAdd: number): number => {
  return currenctAmount + amountToAdd;
};

export const subtract = (
  currenctAmount: number,
  amountToSubtract: number
): number => {
  return currenctAmount - amountToSubtract;
};
