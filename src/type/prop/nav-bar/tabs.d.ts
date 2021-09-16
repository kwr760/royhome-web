import { Dispatch, SetStateAction } from 'react';

export interface NavBarTabsPropType {
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
}
