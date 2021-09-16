import { Dispatch, SetStateAction } from 'react';

export interface NavBarMenuButtonPropType {
  setAnchor:Dispatch<SetStateAction<null | HTMLElement>>;
}
