import { getBeforeware } from '../../../../src/features/tictactoe/middleware/get-beforeware';

describe('feature/tictactoe/middleware/get-beforeware', () => {
  it('should return an array with middleware', () => {
    // Arrange // Act
    const beforeware = getBeforeware();

    // Assert
    expect(beforeware.length).toBe(4);
  });
});
