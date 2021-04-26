import hasNeededRole from './has-needed-role';

describe('util/auth0/has-needed-role', () => {
  it('should return false if empty data', () => {
    // Arrange/Act
    const result = hasNeededRole('bogus');

    // Assert
    expect(result).toEqual(false);
  });
  it('should return true if role is in data', () => {
    // Arrange
    const data = {
      role: 'engineer admin',
    };

    // Act
    const result = hasNeededRole('admin', data);

    // Assert
    expect(result).toEqual(true);
  });
  it('should return true if role added with owner', () => {
    // Arrange
    const data = {
      role: 'engineer owner',
    };

    // Act
    const result = hasNeededRole('admin', data);

    // Assert
    expect(result).toEqual(true);
  });
});
