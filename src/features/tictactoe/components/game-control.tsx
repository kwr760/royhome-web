import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Switch,
  TextField, Typography,
} from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/game-control.styles';
import { FiGlobe } from 'react-icons/fi';

interface Props {
  playerOne: Player,
  playerTwo: Player,
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
type PlayerControlProps = Props & WithStyles<typeof styles>;
const PlayerControlComponent: FunctionComponent<PlayerControlProps> = (
  { playerOne, playerTwo, openDialog, setOpenDialog, classes },
) => {
  const onClose = (_event: never, reason: string) => {
    if (reason && reason == 'backdropClick')
      return;
    setOpenDialog(false);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      className={classes.dialog}
    >
      <DialogContent>
        <TextField
          id="player-name-one"
          label="Player X"
          variant="outlined"
          className={classes.nameInput}
          defaultValue={playerOne.name} />
        <Box className={classes.playerTypeGroup}>
          <FormControlLabel
            control={<Switch className={classes.playerType} defaultChecked />}
            label=""
          />
          <FormControlLabel
            sx={{ lineHeight: '32px' }}
            control={<Switch className={classes.remote} />}
            label={<Typography sx={{ lineHeight: '1' }}>
              <FiGlobe size="1.5em" className={classes.icon} />
            </Typography>}
          />
        </Box>
        <TextField
          id="player-name-two"
          label="Player O"
          variant="outlined"
          className={classes.nameInput}
          defaultValue={playerTwo.name}
          fullWidth />
        <Box className={classes.playerTypeGroup}>
          <FormControlLabel
            control={<Switch className={classes.playerType} defaultChecked />}
            label=""
          />
          <FormControlLabel
            sx={{ lineHeight: '32px' }}
            control={<Switch className={classes.remote} />}
            label={<Typography sx={{ lineHeight: '1' }}>
              <FiGlobe size="1.5em" className={classes.icon} />
            </Typography>}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.buttonBar}>
        <Button className={classes.button} onClick={onCloseDialog}>Close</Button>
        <Button className={classes.button} onClick={onSubmit}>Play Game</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(PlayerControlComponent));
