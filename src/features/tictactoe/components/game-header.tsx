import { Button, Grid, Typography } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { resetGame, startGame } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, GameTypeEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { getStateMessage } from '../functions/get-state-message';
import { styles } from '../styles/game-header.styles';
import PlayerDialog from './player-dialog';

type GameHeaderProps = WithStyles<typeof styles>;
const GameHeaderComponent: FunctionComponent<GameHeaderProps> = ({ classes }) => {
  const [openPlayerOne, setOpenPlayerOne] = React.useState(false);
  const [openPlayerTwo, setOpenPlayerTwo] = React.useState(false);
  const {
    state,
    dispatch,
  } = useTicTacToe();
  const { playerOne, playerTwo } = state;
  const handleSubmit = (player: Player, playerName: string, gameType: GameTypeEnum) => {
    console.log(JSON.stringify(player), playerName, gameType);
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
        return 'Reset Game';
      default:
        return 'Start Game';
    }
  };

  const status = getStateMessage(state);
  return (
    <Grid container className={classes.grid}>
      <Grid container className={classes.top}>
        <Grid item>
          <Button className={classes.button} onClick={clickPlayerOne}>
            <Typography>{playerOne.name} - ({playerOne.piece})</Typography>
          </Button>
          <PlayerDialog
            player={playerOne}
            openDialog={openPlayerOne}
            setOpenDialog={setOpenPlayerOne}
            handleSubmit={handleSubmit}
          />
        </Grid>
        <Grid item>
          <Button className={classes.button} onClick={clickGameAction}>
            <Typography>{ gameActionButton() }</Typography>
          </Button>
        </Grid>
        <Grid item >
          <Button className={classes.button} onClick={clickPlayerTwo}>
            <Typography>{playerTwo.name} - ({playerTwo.piece})</Typography>
          </Button>
          <PlayerDialog
            player={playerTwo}
            openDialog={openPlayerTwo}
            setOpenDialog={setOpenPlayerTwo}
            handleSubmit={handleSubmit}
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
