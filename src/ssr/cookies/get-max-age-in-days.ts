const getMaxAgeInDays = (days: number): number => {
  return 1000 * 60 * 60 * 24 * days;
};

export { getMaxAgeInDays };
