import { Button, Dialog, DialogActions, DialogContent, Tooltip, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import { updateGameState } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { getWinner } from '../functions/get-winner';
import { styles } from '../styles/game-status.styles';

type GameStatusProps = WithStyles<typeof styles>;
const GameStatusComponent: FunctionComponent<GameStatusProps> = (
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
      case GameStateEnum.Welcome:
        return <span>
          Welcome to tic-tac-toe.<br />
          <br />
          You can play with a partner, an ai, or remotely with someone online.
        </span>;
      case GameStateEnum.Wait:
        return <span>Waiting for your opponent.</span>;
      case GameStateEnum.Mismatch:
        return <span>The game ended since there was a problem.</span>;
      case GameStateEnum.Completed: {
        const winner = getWinner(state);
        if (winner?.name) {
          return <span>{winner.name} is the winner.</span>;
        } else {
          return <span>The game ended in a tie.</span>;
        }
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    switch (gameState) {
      case GameStateEnum.Welcome:
      case GameStateEnum.Wait:
      case GameStateEnum.Completed:
      case GameStateEnum.Mismatch:
        setOpenDialog(true);
        break;
      default:
        setOpenDialog(false);
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
        <Tooltip title="Exit dialog to switch to different tab" classes={{ tooltip: classes.tooltip }}>
          <Button className={classes.button} onClick={handleClose}>Exit</Button>
        </Tooltip>
        <Tooltip title="Start new game by going to the Setup" classes={{ tooltip: classes.tooltip }} >
          <Button className={classes.button} onClick={handleSetup}>Setup</Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(GameStatusComponent));
