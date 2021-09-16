import { Dispatch, SetStateAction } from 'react';

export interface NavBarMenuPropType {
  anchor: null | HTMLElement;
  setAnchor: Dispatch<SetStateAction<null | HTMLElement>>;
}
