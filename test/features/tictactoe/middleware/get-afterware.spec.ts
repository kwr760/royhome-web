import { DEVELOPMENT } from '../../../../src/contracts/constants/environments.constants';
import { getAfterware } from '../../../../src/features/tictactoe/middleware/get-afterware';

describe('feature/tictactoe/middleware/get-afterware', () => {
  it('should return an array without logger', () => {
    // Arrange // Act
    const ware = getAfterware();

    // Assert
    expect(ware.length).toBe(0);
  });
  it('should return an array logger', () => {
    jest.isolateModules(() => {
      // Arrange // Act
      process.env.NODE_ENV = DEVELOPMENT;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { getAfterware } = require('../../../../src/features/tictactoe/middleware/get-afterware');
      const ware = getAfterware();

      // Assert
      expect(ware.length).toBe(1);
    });
  });
});
