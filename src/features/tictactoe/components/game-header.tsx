import React, { FunctionComponent, memo } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles, ClassNameMap } from '@mui/styles';
import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';

import { GameTypeEnum, PlayerEnum, StatusEnum } from '../constants/tictactoe.constant';
import { useTicTacToe } from '../context';
import { styles } from '../styles/game-header.styles';
import PlayerDialog from './player-dialog';

const addClasses = (classes: ClassNameMap<string>, status: StatusEnum, winner: PlayerEnum, turn: PlayerEnum) => {
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

type GameHeaderProps = WithStyles<typeof styles>;
const GameHeaderComponent: FunctionComponent<GameHeaderProps> = ({ classes }) => {
  const [openPlayerOne, setOpenPlayerOne] = React.useState(false);
  const [openPlayerTwo, setOpenPlayerTwo] = React.useState(false);
  const {
    state: {
      players,
      status,
      winner,
      turn,
    },
  } = useTicTacToe();
  const handleSubmit = (player: PlayerEnum, playerName: string, gameType: GameTypeEnum) => {
    console.log(player, playerName, gameType);
  };
  const [playerOneClass, playerTwoClass] = addClasses(classes, status, winner || PlayerEnum.None, turn);
  const clickPlayerOne = () => { setOpenPlayerOne(true); };
  const clickPlayerTwo = () => { setOpenPlayerTwo(true); };
  return <Grid justifyContent="space-between" container className={classes.grid}>
    <Grid item className={classes.icon}>
      <Button className={classes.player} onClick={clickPlayerOne}>
        <Typography className={playerOneClass}>{players[0]}</Typography>
      </Button>
      <PlayerDialog
        player={PlayerEnum.One}
        openDialog={openPlayerOne}
        setOpenDialog={setOpenPlayerOne}
        handleSubmit={handleSubmit}
      />
    </Grid>
    <Grid item className={classes.icon}>
      { turn === PlayerEnum.One ? <LeftArrow className={'fa-2x'} /> : <RightArrow className={'fa-2x'} />  }
    </Grid>
    <Grid item className={classes.icon}>
      <Button className={classes.player} onClick={clickPlayerTwo}>
        <Typography className={playerTwoClass}>{players[1]}</Typography>
      </Button>
      <PlayerDialog
        player={PlayerEnum.Two}
        openDialog={openPlayerTwo}
        setOpenDialog={setOpenPlayerTwo}
        handleSubmit={handleSubmit}
      />
    </Grid>
  </Grid>;
};

export default memo(withStyles(styles)(GameHeaderComponent));
