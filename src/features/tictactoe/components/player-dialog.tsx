import React, { FunctionComponent, memo, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { GameTypeEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/player-dialog.styles';

interface Props {
  player: Player;
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (player: Player, playerName: string, gameType: GameTypeEnum) => void,
}
type PlayerDialogProps = Props & WithStyles<typeof styles>;
const PlayerDialogComponent: FunctionComponent<PlayerDialogProps> = (
  { player, openDialog, setOpenDialog, handleSubmit, classes },
) => {
  const [ playerName, setPlayerName ] = useState(player.name);
  const [ gameType, setGameType ] = useState(GameTypeEnum.Pvp);
  const onClose = () => {
    setOpenDialog(false);
  };
  const onSubmit = () => {
    setOpenDialog(false);
    handleSubmit(player, playerName, gameType);
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
    <Dialog open={openDialog} onClose={onClose} >
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
          <ToggleButton value={GameTypeEnum.Pvp} aria-label="left aligned">
            PvP
          </ToggleButton>
          <ToggleButton value={GameTypeEnum.Pvc} aria-label="centered">
            PvC
          </ToggleButton>
          <ToggleButton value={GameTypeEnum.Remote} aria-label="right aligned">
            Remote
          </ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(PlayerDialogComponent));
