import { TextField } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { updatePlayer } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { PieceEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/player-name.styles';

interface Props {
  player: Player;
}
type PlayerNameProps = Props & WithStyles<typeof styles>;
const PlayerName: FunctionComponent<PlayerNameProps> = (
  { player, classes },
) => {
  const {
    dispatch,
  } = useTicTacToe();
  const onChangeName = (position: PieceEnum, event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    dispatch(updatePlayer({ position, player: {
      ...player,
      name,
    } }));
  };
  const disabled = player.type === PlayerTypeEnum.Remote;
  return (
    <TextField
      id={`player-name-${player.piece}`}
      label={`Player ${player.piece}`}
      variant="outlined"
      className={classes.nameInput}
      defaultValue={player.name}
      disabled={disabled}
      onBlur={(event: React.FocusEvent<HTMLInputElement>) => onChangeName(player.piece, event)}
    />
  );
};

export default memo(withStyles(styles)(PlayerName));
