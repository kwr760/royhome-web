import { Box } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/player-control.styles';
import PlayerName from './player-name';
import PlayerRemote from './player-remote';
import PlayerType from './player-type';

interface Props {
  player: Player;
  displayRemote?: boolean;
}
type PlayerControlProps = Props & WithStyles<typeof styles>;
const PlayerControl: FunctionComponent<PlayerControlProps> = (
  { player, displayRemote= false, classes },
) => {
  return (
    <>
      <PlayerName player={player} />
      <Box
        className={classes.playerTypeGroup}
      >
        <PlayerType player={player} />
        { displayRemote && <PlayerRemote player={player} /> }
      </Box>
    </>
  );
};

export default memo(withStyles(styles)(PlayerControl));
