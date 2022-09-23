import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { updateGameState } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerStateEnum } from '../contracts/tictactoe.enum';
import { StateType } from '../contracts/tictactoe.models';
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
    state,
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
  const getStatusMessage = (state: StateType) => {
    const { gameState, playerOne, playerTwo } = state;
    switch (gameState) {
      case GameStateEnum.Message:
        return <span>
          The game has yet to begin.
          Press &lsquo;<i><b>Setup</b></i>&rsquo; to play the game or
          &lsquo;<i><b>Exit</b></i>&rsquo; to switch something else.
        </span>;
      case GameStateEnum.Completed: {
        let winner;
        if (playerOne.playerState === PlayerStateEnum.Winner) {
          winner = playerOne;
        } else if (playerTwo.playerState === PlayerStateEnum.Winner) {
          winner = playerTwo;
        }
        if (winner) {
          return `${winner.name} is a winner.`;
        } else {
          return 'The game ended in a tie.';
        }
      }
      default:
        return 'Unknown state';
    }
  };

  return (
    <Dialog
      open={openStatus}
      onClose={handleClose}
      className={classes.dialog}
    >
      <DialogContent>
        <Typography className={classes.message}>
          {getStatusMessage(state)}
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
