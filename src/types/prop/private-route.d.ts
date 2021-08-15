import { LoadableComponent } from '@loadable/component';
import { ElementType, FunctionComponent } from 'react';

export interface PrivateRoutePropType {
  component: FunctionComponent | LoadableComponent<unknown> | ElementType;
  path: string;
  url?: string;
  userRole?: string;
}
