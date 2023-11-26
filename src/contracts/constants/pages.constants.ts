import { FiInfo, FiBookOpen, FiAlertTriangle, FiLayers, FiMap } from 'react-icons/fi';
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
    tab: 3,
  },
  {
    name: 'Tracker',
    path: '/tracker',
    icon: FiMap,
    tab: 4,
    authenticated: true,
  },
];

export { pageRoutes };
