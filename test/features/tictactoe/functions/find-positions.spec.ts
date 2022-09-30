import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { SearchString } from '../../../../src/features/tictactoe/contracts/tictactoe.functions';
import { findPositions } from '../../../../src/features/tictactoe/functions/find-positions';

type TestTuple = {
  search: SearchString,
  expected: number[],
};

describe('feature/tictactoe/functions/find-positions', () => {
  // Arrange
  const cases: TestTuple[] = [
    {
      search: {
        str: 'X--X--X--',
        include: PlayerEnum.One,
      },
      expected: [0, 3, 6],
    },
    {
      search: {
        str: 'X--X--X--',
        include: PlayerEnum.Neither,
      },
      expected: [1, 2, 4, 5, 7, 8],
    },
    {
      search: {
        str: 'X-OX--X-O',
        include: PlayerEnum.Two,
      },
      expected: [2, 8],
    },
    {
      search: {
        str: 'X--X--X--',
        include: PlayerEnum.Two,
      },
      expected: [],
    },
  ];

  cases.forEach(({ search, expected }: TestTuple) => {
    it(`should find positions - ${search} : ${expected}`, () => {
      expect(findPositions(search)).toEqual(expected);
    });
  });
});
