import { pageRoutes } from '../../contracts/pages.contants';

const findRouteTab = (path: string): number => {
  const page = pageRoutes.find((page) => {
    return page.path === path;
  });

  if (page) {
    return page.tab;
  }

  return 0;
};

export { findRouteTab };
