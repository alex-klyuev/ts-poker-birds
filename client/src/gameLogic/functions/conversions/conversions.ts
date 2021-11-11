export const convertToDollars = (value: number): number => {
  value /= 100;
  return value;
};

export const convertToCents = (value: number): number => {
  value *= 100;
  return value;
};