import type { IconType } from 'react-icons';

interface TabPageType {
  name: string;
  path: string;
  tab: number;
  icon: IconType;
  role?: string;
  authenticated?: boolean;
}

export type { TabPageType };
