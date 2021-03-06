import { Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { TOKEN_URL } from '../../src/contracts/constants/role.constants';
import { TokenRequest } from '../../src/contracts/token.models';
import { checkRole } from '../../src/middleware/check-role';

describe('server/middleware/check-role', () => {
  it('should return error if no role', () => {
    // Arrange
    const req = {} as TokenRequest;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    // Act
    checkRole('bogus')(req, res, next);

    // Assert
    expect(res.sendStatus).toHaveBeenCalledWith(UNAUTHORIZED);
  });
  it('should continue if owner', () => {
    // Arrange
    const req = {
      user: {
        [TOKEN_URL]: {
          role: 'owner',
        },
      },
    } as TokenRequest;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    // Act
    checkRole('engineer')(req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
  });
});
