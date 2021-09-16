import { TabPageType } from '../../type/object/tab-page';
import { UserStateType } from '../../type/state/user';
import { displayPage } from './display-page';

describe('component/page/app-bar/display-page', () => {
  const pages = [
    {
      name: 'NoRoleNoAuth',
    },
    {
      name: 'EngineerRoleNoAuth',
      role: 'engineer',
    },
    {
      name: 'FriendRoleAuth',
      role: 'friend',
      authenticated: true,
    },
    {
      name: 'NoRoleAuth',
      authenticated: true,
    },
  ] as TabPageType[];

  it('displays with no role not authenticate', () => {
    // Arrange
    const authenticated = false;
    const user = {
      role: 'none',
    } as UserStateType;

    // Act
    const matches = pages.filter(displayPage(authenticated, user));

    // Assert
    expect(matches.length).toBe(1);
    expect(matches[0].name).toBe('NoRoleNoAuth');
  });
  it('displays with role and authenticate', () => {
    // Arrange
    const authenticated = true;
    const user = {
      context: {
        role: 'engineer',
      },
    } as UserStateType;

    // Act
    const matches = pages.filter(displayPage(authenticated, user));

    // Assert
    expect(matches.length).toBe(3);
    expect(matches[0].name).toBe('NoRoleNoAuth');
    expect(matches[1].name).toBe('EngineerRoleNoAuth');
    expect(matches[2].name).toBe('NoRoleAuth');
  });
});
