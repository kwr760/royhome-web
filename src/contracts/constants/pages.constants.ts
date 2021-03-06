import { FiInfo, FiBookOpen, FiAlertTriangle, FiLayers } from 'react-icons/fi';
import { TabPageType } from '../tab.models';

const pageRoutes: TabPageType[] = [
  {
    name: 'Resume',
    path: '/',
    icon: FiLayers,
    tab: 0,
  },
  {
    name: 'About',
    path: '/about',
    icon: FiInfo,
    tab: 1,
  },
  {
    name: 'Author',
    path: '/author',
    icon: FiBookOpen,
    tab: 2,
  },
  {
    name: 'Tic-Tac-Toe',
    path: '/tictactoe',
    icon: FiAlertTriangle,
    // role: 'engineer',
    authenticated: true,
    tab: 3,
  },
];

export { pageRoutes };
