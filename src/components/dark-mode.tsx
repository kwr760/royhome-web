import { FormControlLabel, Switch } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModes } from '../contracts/constants/session.constants';
import { getDarkMode } from '../store/session/session.selector';
import { updateDarkMode } from '../store/session/session.slice';
import { styles } from './styles/dark-mode.styles';

type DarkButtonProps = WithStyles<typeof styles>;
export const DarkButtonComponent: FunctionComponent<DarkButtonProps> = ({classes}) => {
  const dispatch = useDispatch();
  const darkness = useSelector(getDarkMode);
  const changeDarkMode = (mode: string) => {
    dispatch(updateDarkMode(mode));
  };
  const handleClick = useCallback(changeDarkMode, [dispatch]);
  const mode = (darkness === DarkModes.DARK_MODE) ? DarkModes.LIGHT_MODE : DarkModes.DARK_MODE;

  return (
    <FormControlLabel
      control={<Switch
        className={classes.darkness}
        onClick={() => handleClick(mode)}
        defaultChecked
      />}
      label=""
    />
  );
};

export default memo(withStyles(styles)(DarkButtonComponent));
