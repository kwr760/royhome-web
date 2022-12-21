import { FormControlLabel, Switch, Tooltip } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { updateRemoteGame } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { styles } from '../styles/player-remote.styles';

type PlayerControlProps = WithStyles<typeof styles>;
const PlayerRemote: FunctionComponent<PlayerControlProps> = (
  { classes },
) => {
  const {
    dispatch,
  } = useTicTacToe();
  const onChangeRemote = (event: React.ChangeEvent<HTMLInputElement>) => {
    const remote = event.target.checked;
    dispatch(updateRemoteGame(remote));
  };
  return (
    <Tooltip
      title='Enable Remote Game'
      placement='top-end'
      className={classes.remote}
    >
      <FormControlLabel
        control={<Switch
          className={classes.switch}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeRemote(event)}
        />}
        label={ <FiGlobe size="1.5em" className={classes.icon} /> }
        labelPlacement='start'
      />
    </Tooltip>
  );
};

export default memo(withStyles(styles)(PlayerRemote));
