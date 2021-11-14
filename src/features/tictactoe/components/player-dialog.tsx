import React, { FunctionComponent, memo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { PlayerEnum } from '../constants/tictactoe.constant';
import { useTicTacToe } from '../context';
import { styles } from '../styles/player-dialog.styles';

interface Props {
  player: PlayerEnum;
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
type PlayerDialogProps = Props & WithStyles<typeof styles>;
const PlayerDialogComponent: FunctionComponent<PlayerDialogProps> = ({ player, openDialog, setOpenDialog, classes}) => {
  const {
    state: {
      players,
    },
  } = useTicTacToe();
  const playerName = (player === PlayerEnum.One) ? players[0] : players[1];
  const clickCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={clickCloseDialog} className={classes.dialog}>
      <DialogTitle>Update {playerName}</DialogTitle>
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
};

export default memo(withStyles(styles)(PlayerDialogComponent));
