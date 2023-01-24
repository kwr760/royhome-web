import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import { resetGame, startGame, updateGameState } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-control.styles';
import PlayerControl from './player-control';
import PlayerRemote from './player-remote';

type PlayerControlProps = WithStyles<typeof styles>;
const GameControl: FunctionComponent<PlayerControlProps> = (
  { classes },
) => {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    state,
    dispatch,
  } = useTicTacToe();
  const { gameState, playerOne, playerTwo, remote } = state;
  const onCloseControl = () => {
    dispatch(updateGameState(GameStateEnum.Message));
    setOpenDialog(false);
  };
  const onPlayGame = () => {
    dispatch(resetGame());
    dispatch(startGame());
    setOpenDialog(false);
  };

  useEffect(() => {
    switch (gameState) {
      case GameStateEnum.Setup:
        setOpenDialog(true);
        break;
      case GameStateEnum.Active:
        setOpenDialog(false);
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
      <DialogContent
        className={classes.informationDialog}
      >
        <PlayerControl player={playerOne} />
        { !remote && <PlayerControl player={playerTwo} /> }
        <PlayerRemote />
      </DialogContent>
      <DialogActions className={classes.actionDialog}>
        <Button className={classes.button} onClick={onCloseControl}>Close</Button>
        <Button className={classes.button} onClick={onPlayGame}>Play Game</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(GameControl));
