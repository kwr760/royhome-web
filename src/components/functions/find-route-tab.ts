import { pages } from '../../config/pages';

export const findRouteTab = (path: string): number => {
  const page = pages.find((page) => {
    return page.path === path;
  });

  if (page) {
    return page.tab;
  }

  return 0;
};
