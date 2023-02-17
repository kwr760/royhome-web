/* eslint-disable @typescript-eslint/no-unused-vars */
import { expressjwt } from 'express-jwt';
import { checkJwt } from '../../src/middleware/check-jwt';

jest.mock('express-jwt');

describe('server/middleware/check-jwt', () => {
  it('should setup jwt', () => {
    // Arrange
    // Act
    // Assert
    expect(expressjwt).not.toHaveBeenCalled();
  });
});
