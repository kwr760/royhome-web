import { SearchString } from '../contracts/tictacttoe.functions';

const findPositions = (search: SearchString): number[] => {
  const positions: number[] = [];
  search.str.split('').forEach((element, index) => {
    if (element === search.include) {
      positions.push(index);
    }
  });

  return positions;
};

export { findPositions };
