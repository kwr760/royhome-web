import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { resetGame, startGame, updatePlayer } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { getStateMessage } from '../functions/get-state-message';
import { styles } from '../styles/game-header.styles';
import PlayerDialog from './player-dialog';
import PlayerIcon from './player-icon';

type GameHeaderProps = WithStyles<typeof styles>;
const GameHeaderComponent: FunctionComponent<GameHeaderProps> = ({ classes }) => {
  const [openPlayerOne, setOpenPlayerOne] = React.useState(false);
  const [openPlayerTwo, setOpenPlayerTwo] = React.useState(false);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
  const {
    state,
    dispatch,
  } = useTicTacToe();
  const { playerOne, playerTwo } = state;
  const handleSubmit = (position: PlayerEnum, player: Player) => {
    return dispatch(updatePlayer({ position, player }));
  };
  const clickPlayerOne = () => {
    setOpenPlayerOne(true);
  };
  const clickPlayerTwo = () => {
    setOpenPlayerTwo(true);
  };
  const clickGameAction = () => {
    switch (state.gameState) {
      case GameStateEnum.Win:
      case GameStateEnum.Tie:
      case GameStateEnum.Active:
        return dispatch(resetGame());
      default:
        return dispatch(startGame());
    }
  };
  const gameActionButton = () => {
    switch (state.gameState) {
      case GameStateEnum.Win:
      case GameStateEnum.Tie:
      case GameStateEnum.Active:
        return 'Reset';
      default:
        return 'Start';
    }
  };
  const getDisplayName = (player: Player) => {
    return isMobile ? `${player.piece}` : ` ${player.name}`;
  };

  const status = getStateMessage(state);
  return (
    <Grid container className={classes.grid}>
      <Grid container className={classes.top}>
        <Grid item>
          <Button className={classes.button} onClick={clickPlayerOne}>
            <Typography><PlayerIcon type={playerOne.type} />{getDisplayName(playerOne)}</Typography>
          </Button>
          <PlayerDialog
            player={playerOne}
            openDialog={openPlayerOne}
            setOpenDialog={setOpenPlayerOne}
            handleSubmit={(player) => { handleSubmit(PlayerEnum.One, player); }}
          />
        </Grid>
        <Grid item>
          <Button className={classes.button} onClick={clickGameAction}>
            <Typography>{ gameActionButton() }</Typography>
          </Button>
        </Grid>
        <Grid item >
          <Button className={classes.button} onClick={clickPlayerTwo}>

            <Typography><PlayerIcon type={playerTwo.type} />{getDisplayName(playerTwo)}</Typography>
          </Button>
          <PlayerDialog
            player={playerTwo}
            openDialog={openPlayerTwo}
            setOpenDialog={setOpenPlayerTwo}
            handleSubmit={(player) => { handleSubmit(PlayerEnum.Two, player); }}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.bottom}>
        <Grid item>
          <Typography>{status}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(withStyles(styles)(GameHeaderComponent));
