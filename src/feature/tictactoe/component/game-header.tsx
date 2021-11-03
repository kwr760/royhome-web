import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import React, { FunctionComponent, useMemo } from 'react';

import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';
import { PlayerEnum, StatusEnum } from '../constant/tictactoe.constant';
import { useTicTacToe } from '../context';
import { useStyles } from '../style/game-header.styles';
import { PlayerDialog } from './player-dialog';

type ClassNames = ClassNameMap<'grid' | 'active' | 'inactive' | 'winner' | 'loser' | 'player'>;
const addClasses = (classes: ClassNames, status: StatusEnum, winner: PlayerEnum, turn: PlayerEnum) => {
  if (status === StatusEnum.Tie) {
    return [classes.loser, classes.loser];
  }
  if (status === StatusEnum.Win) {
    return [
      winner === PlayerEnum.One ? classes.winner : classes.loser,
      winner === PlayerEnum.Two ? classes.winner : classes.loser,
    ];
  }
  return [
    turn === PlayerEnum.One ? classes.active : classes.inactive,
    turn === PlayerEnum.Two ? classes.active : classes.inactive,
  ];
};

export const GameHeader: FunctionComponent = () => {
  const [openPlayerOne, setOpenPlayerOne] = React.useState(false);
  const [openPlayerTwo, setOpenPlayerTwo] = React.useState(false);
  const classes = useStyles();
  const {
    state: {
      players,
      status,
      winner,
      turn,
    },
  } = useTicTacToe();
  const [playerOneClass, playerTwoClass] = addClasses(classes, status, winner || PlayerEnum.None, turn);
  const clickPlayerOne = () => {
    setOpenPlayerOne(true);
  };
  const clickPlayerTwo = () => {
    setOpenPlayerTwo(true);
  };
  return useMemo(() => (
    <Grid justifyContent="space-between" container className={classes.grid}>
      <Grid item className={classes.icon}>
        <Button className={classes.player} onClick={clickPlayerOne}>
          <Typography className={playerOneClass}>{players[0]}</Typography>
        </Button>
        <PlayerDialog player={PlayerEnum.One} openDialog={openPlayerOne} setOpenDialog={setOpenPlayerOne} />
      </Grid>
      <Grid item className={classes.icon}>
        { turn === PlayerEnum.One ? <LeftArrow className={'fa-2x'} /> : <RightArrow className={'fa-2x'} />  }
      </Grid>
      <Grid item className={classes.icon}>
        <Button className={classes.player} onClick={clickPlayerTwo}>
          <Typography className={playerTwoClass}>{players[1]}</Typography>
        </Button>
        <PlayerDialog player={PlayerEnum.Two} openDialog={openPlayerTwo} setOpenDialog={setOpenPlayerTwo} />
      </Grid>
    </Grid>
  ),
  [classes.grid, classes.icon, classes.player, openPlayerOne, openPlayerTwo, playerOneClass, playerTwoClass,
    players, turn],
  );
};

export default GameHeader;
