import { FormControlLabel, Switch, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { updatePlayer } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { PlayerEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/player-remote.styles';

interface Props {
  player: Player;
}
type PlayerControlProps = Props & WithStyles<typeof styles>;
const PlayerRemote: FunctionComponent<PlayerControlProps> = (
  { player, classes },
) => {
  const {
    dispatch,
  } = useTicTacToe();
  const onChangeType = (position: PlayerEnum, event: React.ChangeEvent<HTMLInputElement>) => {
    const remote = event.target.checked;
    dispatch(updatePlayer({ position, player: {
      ...player,
      remote,
    }}));
  };
  return (
    <FormControlLabel
      sx={{ lineHeight: '32px' }}
      control={<Switch
        className={classes.remote}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeType(player.piece, event)}
      />}
      label={<Typography sx={{ lineHeight: '1' }}>
        <FiGlobe size="1.5em" className={classes.icon} />
      </Typography>}
    />
  );
};

export default memo(withStyles(styles)(PlayerRemote));
