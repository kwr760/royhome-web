import { TabPageType } from '../../types/object/tab-page';

import { FiInfo, FiBookOpen, FiAlertTriangle, FiLayers } from 'react-icons/fi';

export const pages: TabPageType[] = [
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
    name: 'Work In Progress',
    path: '/tictactoe',
    icon: FiAlertTriangle,
    role: 'engineer',
    authenticated: true,
    tab: 3,
  },
];

