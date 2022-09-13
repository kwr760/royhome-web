import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { startGame, updateGameState, updatePlayer } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-control.styles';

interface Props {
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
type PlayerControlProps = Props & WithStyles<typeof styles>;
const PlayerControlComponent: FunctionComponent<PlayerControlProps> = (
  { openDialog, setOpenDialog, classes },
) => {
  const {
    state,
    dispatch,
  } = useTicTacToe();
  const { playerOne, playerTwo } = state;
  const onCloseControl = () => {
    dispatch(updateGameState(GameStateEnum.Message));
    setOpenDialog(false);
  };
  const onPlayGame = () => {
    dispatch(startGame());
    setOpenDialog(false);
  };
  const onChangeName = (position: PlayerEnum, event: React.ChangeEvent<HTMLInputElement>) => {
    const player = position === PlayerEnum.One ? playerOne : playerTwo;
    const name = event.target.value;
    dispatch(updatePlayer({ position, player: {
      ...player,
      name,
    } }));
  };
  const onChangeType = (position: PlayerEnum, event: React.ChangeEvent<HTMLInputElement>) => {
    const player = position === PlayerEnum.One ? playerOne : playerTwo;
    const type = event.target.checked ? PlayerTypeEnum.Human : PlayerTypeEnum.Computer;
    dispatch(updatePlayer({ position, player: {
      ...player,
      type,
    } }));
  };
  return (
    <Dialog
      open={openDialog}
      className={classes.dialog}
    >
      <DialogContent>
        <TextField
          id="player-name-one"
          label="Player X"
          variant="outlined"
          className={classes.nameInput}
          defaultValue={playerOne.name}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => onChangeName(PlayerEnum.One, event)}
        />
        <Box
          className={classes.playerTypeGroup}
        >
          <FormControlLabel
            control={<Switch
              data-testid="player-one-type"
              className={classes.playerType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeType(PlayerEnum.One, event)}
              defaultChecked
            />}
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
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => onChangeName(PlayerEnum.Two, event)}
        />
        <Box
          className={classes.playerTypeGroup}
        >
          <FormControlLabel
            control={<Switch
              data-testid="player-two-type"
              className={classes.playerType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeType(PlayerEnum.Two, event)}
              defaultChecked
            />}
            label=""
          />
          <FormControlLabel
            sx={{ lineHeight: '32px' }}
            control={<Switch className={classes.remote} />}
            label={<Typography sx={{ lineHeight: '1' }} aria-label="kroy" >
              <FiGlobe size="1.5em" className={classes.icon} />
            </Typography>}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.buttonBar}>
        <Button className={classes.button} onClick={onCloseControl}>Close</Button>
        <Button className={classes.button} onClick={onPlayGame}>Play Game</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(withStyles(styles)(PlayerControlComponent));
