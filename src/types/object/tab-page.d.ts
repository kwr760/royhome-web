import { IconType } from 'react-icons';

export interface TabPageType {
  name: string;
  path: string;
  tab: number;
  icon: IconType;
  role?: string;
  authenticated?: boolean;
}
