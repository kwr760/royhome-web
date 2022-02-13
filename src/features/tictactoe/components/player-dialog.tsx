import React, { FunctionComponent, memo, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/player-dialog.styles';

interface Props {
  player: Player;
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (player: Player) => void,
}
type PlayerDialogProps = Props & WithStyles<typeof styles>;
const PlayerDialogComponent: FunctionComponent<PlayerDialogProps> = (
  { player, openDialog, setOpenDialog, handleSubmit, classes },
) => {
  const [ playerName, setPlayerName ] = useState(player.name);
  const [ playerType, setPlayerType ] = useState(PlayerTypeEnum.Human);
  const onClose = () => {
    setOpenDialog(false);
  };
  const onSubmit = () => {
    setOpenDialog(false);
    player.name = playerName;
    player.type = playerType;
    handleSubmit(player);
  };
  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newName = event.target.value;
    setPlayerName(newName);
  };
  const handleChangePlayerType = (
    _event: React.MouseEvent<HTMLElement>,
    newPlayerType: PlayerTypeEnum,
  ) => {
    setPlayerType(newPlayerType);
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
          value={playerType}
          exclusive
          onChange={handleChangePlayerType}
          aria-label="text alignment"
          className={classes.playerTypeGroup}
          fullWidth
        >
          <ToggleButton value={PlayerTypeEnum.Human} aria-label="left aligned">
            {PlayerTypeEnum.Human}
          </ToggleButton>
          <ToggleButton value={PlayerTypeEnum.Computer} aria-label="centered">
            {PlayerTypeEnum.Computer}
          </ToggleButton>
          <ToggleButton value={PlayerTypeEnum.Remote} aria-label="right aligned">
            {PlayerTypeEnum.Remote}
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
