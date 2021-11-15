import React, { FunctionComponent, memo, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { GameTypeEnum, PlayerEnum } from '../constants/tictactoe.constant';
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
  const [ playerName, setPlayerName ] = useState((player === PlayerEnum.One) ? players[0] : players[1]);
  const [ gameType, setGameType ] = useState(GameTypeEnum.pvp);
  const clickCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newName = event.target.value;
    setPlayerName(newName);
  };
  const handleChangeGameType = (
    _event: React.MouseEvent<HTMLElement>,
    newGameType: GameTypeEnum,
  ) => {
    setGameType(newGameType);
  };

  return (
    <Dialog open={openDialog} onClose={clickCloseDialog} >
      <DialogTitle>Update {playerName}</DialogTitle>
      <DialogContent>
        <TextField
          id="player-name"
          label="Name"
          variant="outlined"
          onChange={handleChangeName}
          className={classes.nameInput}
          defaultValue={playerName}
          fullWidth
        />
        <Typography>Type of game</Typography>
        <ToggleButtonGroup
          value={gameType}
          exclusive
          onChange={handleChangeGameType}
          aria-label="text alignment"
          className={classes.gameTypeGroup}
          fullWidth
        >
          <ToggleButton value={GameTypeEnum.pvp} aria-label="left aligned">
            PvP
          </ToggleButton>
          <ToggleButton value={GameTypeEnum.pvc} aria-label="centered">
            PvC
          </ToggleButton>
          <ToggleButton value={GameTypeEnum.remote} aria-label="right aligned">
            Remote
          </ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={clickCloseDialog}>Cancel</Button>
        <Button onClick={clickCloseDialog}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(PlayerDialogComponent));
