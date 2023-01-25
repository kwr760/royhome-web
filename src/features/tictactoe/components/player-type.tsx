import { FormControlLabel, Switch } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { updatePlayer } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { PieceEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/player-type.styles';

interface Props {
  player: Player;
}
type PlayerControlProps = Props & WithStyles<typeof styles>;
const PlayerType: FunctionComponent<PlayerControlProps> = (
  { player, classes },
) => {
  const {
    dispatch,
  } = useTicTacToe();
  const onChangeType = (position: PieceEnum, event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.checked ? PlayerTypeEnum.Human : PlayerTypeEnum.Computer;
    dispatch(updatePlayer({ position, player: {
      ...player,
      type,
    } }));
  };
  return (
    <FormControlLabel
      control={<Switch
        data-testid={`player-type-${player.piece}`}
        className={classes.playerType}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeType(player.piece, event)}
        checked={player.type === PlayerTypeEnum.Human}
      />}
      label=""
    />
  );
};

export default memo(withStyles(styles)(PlayerType));
