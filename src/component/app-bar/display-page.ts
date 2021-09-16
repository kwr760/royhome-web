import { UserStateType } from '../../type/state/user';
import { shouldDisplayTab } from './should-display-tab';

import { TabPageType } from '../../type/object/tab-page';

export const displayPage = (authenticated: boolean, user: UserStateType) => (page: TabPageType): boolean => {
  if (page.role) {
    return shouldDisplayTab(authenticated, page.role, user);
  }

  if (page.authenticated) {
    return authenticated;
  }

  return true;
};
