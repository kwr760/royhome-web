import { Auth0User } from '../../contracts/auth0.models';
import { TabPageType } from '../../contracts/tab.models';
import { shouldDisplayTab } from './should-display-tab';

const displayPage = (authenticated: boolean, user?: Auth0User) => (page: TabPageType): boolean => {
  if (page.role) {
    return shouldDisplayTab(authenticated, page.role, user);
  }

  if (page.authenticated) {
    return authenticated;
  }

  return true;
};

export { displayPage };
