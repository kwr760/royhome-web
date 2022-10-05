import { Button, Dialog, DialogActions, DialogContent, } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import { resetGame, startGame, updateGameState } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-control.styles';
import PlayerControl from './player-control';

type PlayerControlProps = WithStyles<typeof styles>;
const GameControl: FunctionComponent<PlayerControlProps> = (
  { classes },
) => {
  const [openDialog, setOpenDialog] = useState(true);
  const {
    state,
    dispatch,
  } = useTicTacToe();
  const { gameState, client, sessionId, playerOne, playerTwo } = state;
  const onCloseControl = () => {
    dispatch(updateGameState(GameStateEnum.Message));
    setOpenDialog(false);
  };
  const onPlayGame = () => {
    if (client) {
      client.publish({
        destination: '/start',
        body: sessionId,
      });
    }
    dispatch(resetGame());
    dispatch(startGame());
    setOpenDialog(false);
  };

  useEffect(() => {
    switch (gameState) {
      case GameStateEnum.Setup:
        setOpenDialog(true);
        break;
      default: {
        break;
      }
    }
  }, [gameState]);

  return (
    <Dialog
      open={openDialog}
      className={classes.dialog}
    >
      <DialogContent>
        <PlayerControl player={playerOne} />
        <PlayerControl player={playerTwo} />
      </DialogContent>
      <DialogActions className={classes.buttonBar}>
        <Button className={classes.button} onClick={onCloseControl}>Close</Button>
        <Button className={classes.button} onClick={onPlayGame}>Play Game</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(GameControl));
