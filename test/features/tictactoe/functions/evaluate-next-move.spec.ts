import { PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { NextMove } from '../../../../src/features/tictactoe/contracts/tictacttoe.functions';
import { evaluateNextMove } from '../../../../src/features/tictactoe/functions/evaluate-next-move';

type TestTuple = {
  nextMove: NextMove,
  expected: number[],
};

describe('feature/tictactoe/functions/evaluate-next-move', () => {
  // Arrange
  const cases: TestTuple[] = [
    {
      nextMove: {
        board: 'XX-X-XX-X',
        player: PlayerEnum.One,
      },
      expected: [2, 4, 7],
    },
    {
      nextMove: {
        board: 'X-X------',
        player: PlayerEnum.One,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '---XX----',
        player: PlayerEnum.One,
      },
      expected: [5],
    },
    {
      nextMove: {
        board: '-------XX',
        player: PlayerEnum.One,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: 'X--X-----',
        player: PlayerEnum.One,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: '----X--X-',
        player: PlayerEnum.One,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '--X--X---',
        player: PlayerEnum.One,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: 'X---X----',
        player: PlayerEnum.One,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: '----X-X--',
        player: PlayerEnum.One,
      },
      expected: [2],
    },
    {
      nextMove: {
        board: 'X-X------',
        player: PlayerEnum.Two,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '---XX----',
        player: PlayerEnum.Two,
      },
      expected: [5],
    },
    {
      nextMove: {
        board: '-------XX',
        player: PlayerEnum.Two,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: 'X--X-----',
        player: PlayerEnum.Two,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: '----X--X-',
        player: PlayerEnum.Two,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '--X--X---',
        player: PlayerEnum.Two,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: 'X---X----',
        player: PlayerEnum.Two,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: '----X-X--',
        player: PlayerEnum.Two,
      },
      expected: [2],
    },
  ];

  cases.forEach(({ nextMove, expected }: TestTuple) => {
    it(`should get next move - ${JSON.stringify(nextMove)} : ${expected}`, () => {
      const move = evaluateNextMove(nextMove);
      expect(expected.includes(move)).toBeTruthy();
    });
  });
});
