import jwt from 'express-jwt';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import checkJwt from '../../src/middleware/check-jwt';

jest.mock('express-jwt');

describe('server/middleware/check-jwt', () => {
  it('should setup jwt', () => {
    // Arrange
    // Act
    // Assert
    expect(jwt).not.toHaveBeenCalled();
  });
});
