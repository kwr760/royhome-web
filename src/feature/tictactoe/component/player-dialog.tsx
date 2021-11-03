import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { FunctionComponent, useMemo } from 'react';

import { PlayerEnum } from '../constant/tictactoe.constant';
import { useTicTacToe } from '../context';
// import { useStyles } from '../style/game-header.styles';
import { PlayerDialogProps } from '../type/tictactoe';

export const PlayerDialog: FunctionComponent<PlayerDialogProps> = ({ player, openDialog, setOpenDialog}) => {
  // const classes = useStyles();
  const {
    state: {
      players,
    },
  } = useTicTacToe();
  const playerName = (player === PlayerEnum.One) ? players[0] : players[1];
  return useMemo(() => {
    const clickCloseDialog = () => {
      setOpenDialog(false);
    };
    return (
      <Dialog open={openDialog} onClose={clickCloseDialog}>
        <DialogTitle>{playerName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Content
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCloseDialog}>Cancel</Button>
          <Button onClick={clickCloseDialog}>Update</Button>
        </DialogActions>
      </Dialog>
    );
  },
  [openDialog, playerName, setOpenDialog],
  );
};
