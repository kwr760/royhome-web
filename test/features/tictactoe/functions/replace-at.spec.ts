import { replaceAt } from '../../../../src/features/tictactoe/functions/replace-at';

type TestTuple = {
  str: string,
  index: number,
  replacement: string,
  expected: string,
};

describe('feature/tictactoe/functions/replace-at', () => {
  // Arrange
  const cases = [
    {
      str: '------',
      index: 0,
      replacement: 'a',
      expected: 'a-----',
    },
    {
      str: '------',
      index: 5,
      replacement: 'a',
      expected: '-----a',
    },
    {
      str: '------',
      index: 2,
      replacement: 'abc',
      expected: '--abc-',
    },
    {
      str: '------',
      index: 8,
      replacement: 'a',
      expected: '------a',
    },
  ];

  cases.forEach(({ str, index, replacement, expected }: TestTuple) => {
    it(`should check string replacement - ${str} : ${index} : ${replacement} :${expected}`, () => {
      expect(replaceAt(str, index, replacement)).toEqual(expected);
    });
  });
});
