import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { updateGameState } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-status.styles';

interface Props {
  openStatus: boolean,
  setOpenStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
type PlayerStatusProps = Props & WithStyles<typeof styles>;
const PlayerStatusComponent: FunctionComponent<PlayerStatusProps> = (
  { openStatus, setOpenStatus, classes },
) => {
  const {
    dispatch,
  } = useTicTacToe();
  const handleClose = () => {
    dispatch(updateGameState(GameStateEnum.Exit));
    setOpenStatus(false);
  };
  const handleSetup = () => {
    dispatch(updateGameState(GameStateEnum.Setup));
    setOpenStatus(false);
  };
  return (
    <Dialog
      open={openStatus}
      onClose={handleClose}
      className={classes.dialog}
    >
      <DialogContent>
        <Typography className={classes.message}>
          The game has yet to begin.
          Press &lsquo;<i><b>Setup</b></i>&rsquo; to play the game or
          &lsquo;<i><b>Exit</b></i>&rsquo; to switch something else.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.buttonBar}>
        <Button className={classes.button} onClick={handleClose}>Exit</Button>
        <Button className={classes.button} onClick={handleSetup}>Setup</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(PlayerStatusComponent));
