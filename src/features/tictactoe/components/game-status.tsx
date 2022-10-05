import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import { updateGameState } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { getWinner } from '../functions/get-winner';
import { styles } from '../styles/game-status.styles';

type PlayerStatusProps = WithStyles<typeof styles>;
const PlayerStatusComponent: FunctionComponent<PlayerStatusProps> = (
  { classes },
) => {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    state,
    dispatch,
  } = useTicTacToe();
  const { gameState } = state;
  const handleClose = () => {
    dispatch(updateGameState(GameStateEnum.Exit));
    setOpenDialog(false);
  };
  const handleSetup = () => {
    dispatch(updateGameState(GameStateEnum.Setup));
    setOpenDialog(false);
  };
  const renderMessage = () => {
    switch (gameState) {
      case GameStateEnum.Message:
        return <span>
          The game has yet to begin.
          Press &lsquo;<i><b>Setup</b></i>&rsquo; to play the game or
          &lsquo;<i><b>Exit</b></i>&rsquo; to switch something else.
        </span>;
      case GameStateEnum.Completed: {
        const winner = getWinner(state);
        if (winner) {
          return <span>${winner} is a winner.</span>;
        } else {
          return <span>The game ended in a tie.</span>;
        }
      }
      default:
        return <span>Unknown state</span>;
    }
  };

  useEffect(() => {
    switch (gameState) {
      case GameStateEnum.Message:
      case GameStateEnum.Completed:
        setOpenDialog(true);
        break;
    }
  }, [gameState]);

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      className={classes.dialog}
    >
      <DialogContent>
        <Typography className={classes.message}>
          {renderMessage()}
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
