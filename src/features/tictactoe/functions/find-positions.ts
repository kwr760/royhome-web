interface searchString {
  str: string;
  include: string;
}

const findPositions = (search: searchString): number[] => {
  const positions: number[] = [];
  search.str.split('').forEach((element, index) => {
    if (element === search.include) {
      positions.push(index);
    }
  });

  return positions;
};

export { findPositions };
