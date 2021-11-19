import React, { FunctionComponent, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { FiSun, FiMoon } from 'react-icons/fi';
import { DarkModes } from '../contracts/constants/session.constants';
import { updateDarkMode } from '../store/session/session.slice';
import { getDarkMode } from '../store/session/session.selector';
import { styles } from './styles/dark-mode.styles';

type DarkButtonProps = WithStyles<typeof styles>;
export const DarkButtonComponent: FunctionComponent<DarkButtonProps> = ({classes}) => {
  const dispatch = useDispatch();
  const darkness = useSelector(getDarkMode);
  const changeDarkMode = (mode: string) => {
    dispatch(updateDarkMode(mode));
  };
  const handleClick = useCallback(changeDarkMode, [dispatch]);
  const Icon = (darkness === DarkModes.DARK_MODE) ? <FiMoon className={classes.moonFix} /> : <FiSun />;
  const mode = (darkness === DarkModes.DARK_MODE) ? DarkModes.LIGHT_MODE : DarkModes.DARK_MODE;

  return (
    <Button className={classes.button} onClick={() => handleClick(mode)}>
      {Icon}
    </Button>
  );
};

export default memo(withStyles(styles)(DarkButtonComponent));
