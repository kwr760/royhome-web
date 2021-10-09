import { Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useMemo } from 'react';
import { useTicTacToe } from '../context';
import { GameState } from '../context/tictactoe.constant';
import { StatusType } from '../type/tictactoe';
import { useStyles } from './game-header.styles';

import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';
import { ClassNameMap } from '@material-ui/styles';

type ClassNames = ClassNameMap<'grid' | 'active' | 'inactive' | 'winner' | 'loser' | 'player'>;
const addClasses = (classes: ClassNames, gameStatus: StatusType) => {
  if (gameStatus.state === GameState.Tie) {
    return [classes.loser, classes.loser];
  }
  if (gameStatus.state === GameState.Win) {
    const result = [classes.loser, classes.loser];
    result[gameStatus.winner as number] = classes.winner;
    return result;
  }
  const result = [classes.inactive, classes.inactive];
  result[gameStatus.turn] = classes.active;
  return result;
};

export const GameHeader: FunctionComponent = () => {
  const classes = useStyles();
  const {
    state: {
      players,
      status,
    },
  } = useTicTacToe();
  const [playerOneClass, playerTwoClass] = addClasses(classes, status);

  return useMemo(() => (
    <Grid justifyContent="space-between" container className={classes.grid}>
      <Grid item className={classes.player}>
        <Typography className={playerOneClass}>{players[0]}</Typography>
      </Grid>
      <Grid item>
        { status.turn ? <RightArrow className={'fa-2x'} /> : <LeftArrow className={'fa-2x'} />  }
      </Grid>
      <Grid item className={classes.player}>
        <Typography className={playerTwoClass}>{players[1]}</Typography>
      </Grid>
    </Grid>
  ),
  [classes.grid, classes.player, playerOneClass, playerTwoClass, players, status.turn],
  );
};

export default GameHeader;
