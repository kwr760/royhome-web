import { PieceEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { NextMove } from '../../../../src/features/tictactoe/contracts/tictactoe.functions';
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
        player: PieceEnum.X,
      },
      expected: [2, 4, 7],
    },
    {
      nextMove: {
        board: 'X-X------',
        player: PieceEnum.X,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '---XX----',
        player: PieceEnum.X,
      },
      expected: [5],
    },
    {
      nextMove: {
        board: '-------XX',
        player: PieceEnum.X,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: 'X--X-----',
        player: PieceEnum.X,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: '----X--X-',
        player: PieceEnum.X,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '--X--X---',
        player: PieceEnum.X,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: 'X---X----',
        player: PieceEnum.X,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: '----X-X--',
        player: PieceEnum.X,
      },
      expected: [2],
    },
    {
      nextMove: {
        board: 'X-X------',
        player: PieceEnum.O,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '---XX----',
        player: PieceEnum.O,
      },
      expected: [5],
    },
    {
      nextMove: {
        board: '-------XX',
        player: PieceEnum.O,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: 'X--X-----',
        player: PieceEnum.O,
      },
      expected: [6],
    },
    {
      nextMove: {
        board: '----O--O-',
        player: PieceEnum.X,
      },
      expected: [1],
    },
    {
      nextMove: {
        board: '--X--X---',
        player: PieceEnum.O,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: 'X---X----',
        player: PieceEnum.O,
      },
      expected: [8],
    },
    {
      nextMove: {
        board: '----X-X--',
        player: PieceEnum.O,
      },
      expected: [2],
    },
    {
      nextMove: {
        board: '---------',
        player: PieceEnum.O,
      },
      expected: [4],
    },
    {
      nextMove: {
        board: '----X----',
        player: PieceEnum.O,
      },
      expected: [0, 2, 6, 8],
    },
    {
      nextMove: {
        board: '?-?-?-?-?',
        player: PieceEnum.O,
      },
      expected: [1, 3, 5, 7],
    },
  ];

  cases.forEach(({ nextMove, expected }: TestTuple) => {
    it(`should get next move - ${JSON.stringify(nextMove)} : ${expected}`, () => {
      const move = evaluateNextMove(nextMove);
      expect(expected.includes(move)).toBeTruthy();
    });
  });
});
