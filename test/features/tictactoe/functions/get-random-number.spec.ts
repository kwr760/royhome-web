import { getRandomNumber } from '../../../../src/features/tictactoe/functions/get-random-number';

type TestTuple = {
  max: number,
  count: number,
};

describe('feature/tictactoe/functions/get-random-number', () => {
  // Arrange
  const cases = [
    {
      max: 1,
      count: 10,
    },
    {
      max: 5,
      count: 10,
    },
    {
      max: 9,
      count: 100,
    },
    {
      max: 100,
      count: 1000,
    },
  ];

  cases.forEach(({ max, count }: TestTuple) => {
    it(`should random number - ${max} : ${count}`, () => {
      while (count--) {
        const rand = getRandomNumber(max);
        expect(rand).toBeGreaterThanOrEqual(0);
        expect(rand).toBeLessThan(max);
      }
    });
  });
});
