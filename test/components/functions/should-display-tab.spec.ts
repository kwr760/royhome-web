import { shouldDisplayTab } from '../../../src/components/functions/should-display-tab';
import { Auth0User } from '../../../src/contracts/auth0.models';

describe('component/page/app-bar/should-display-tab', () => {
  it('displays with no role not authenticate', () => {
    // Arrange
    const user = {
      role: 'none',
    } as Auth0User;

    // Act
    const result = shouldDisplayTab(false, '', user);

    // Assert
    expect(result).toBeTruthy();
  });
  it('displays with role and authenticate', () => {
    // Arrange
    const user = {
      context: {
        role: 'engineer',
      },
    } as Auth0User;

    // Act
    const shouldTrue = shouldDisplayTab(true, 'engineer', user);
    const shouldFalse = shouldDisplayTab(true, 'friend', user);

    // Assert
    expect(shouldTrue).toBeTruthy();
    expect(shouldFalse).toBeFalsy();
  });
});
