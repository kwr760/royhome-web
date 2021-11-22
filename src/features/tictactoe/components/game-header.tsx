import React, { FunctionComponent, memo } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { ClassNameMap, WithStyles } from '@mui/styles';
import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, GameTypeEnum, PlayerEnum, PlayerStateEnum } from '../contracts/tictactoe.enum';
import { Player } from '../contracts/tictactoe.models';
import { styles } from '../styles/game-header.styles';
import PlayerDialog from './player-dialog';

const addHeaderClasses = (
  classes: ClassNameMap<string>, gameState: GameStateEnum, playerOne: Player, playerTwo: Player, turn: PlayerEnum,
) => {
  if (gameState === GameStateEnum.Tie) {
    return [classes.loser, classes.loser];
  }
  if (gameState === GameStateEnum.Win) {
    return [
      playerOne.playerState === PlayerStateEnum.Winner ? classes.winner : classes.loser,
      playerTwo.playerState === PlayerStateEnum.Winner ? classes.winner : classes.loser,
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
      playerOne,
      playerTwo,
      gameState,
      turn,
    },
  } = useTicTacToe();
  const handleSubmit = (player: Player, playerName: string, gameType: GameTypeEnum) => {
    console.log(JSON.stringify(player), playerName, gameType);
  };
  const [playerOneClass, playerTwoClass] = addHeaderClasses(classes, gameState, playerOne, playerTwo, turn);
  const clickPlayerOne = () => {
    setOpenPlayerOne(true);
  };
  const clickPlayerTwo = () => {
    setOpenPlayerTwo(true);
  };
  return <Grid justifyContent="space-between" container className={classes.grid}>
    <Grid item >
      <Button className={classes.player} onClick={clickPlayerOne}>
        <Typography className={playerOneClass}>{playerOne.name}</Typography>
      </Button>
      <PlayerDialog
        player={playerOne}
        openDialog={openPlayerOne}
        setOpenDialog={setOpenPlayerOne}
        handleSubmit={handleSubmit}
      />
    </Grid>
    <Grid item className={classes.icon}>
      { turn === PlayerEnum.One ? <LeftArrow className={'fa-2x'} /> : <RightArrow className={'fa-2x'} />  }
    </Grid>
    <Grid item >
      <Button className={classes.player} onClick={clickPlayerTwo}>
        <Typography className={playerTwoClass}>{playerTwo.name}</Typography>
      </Button>
      <PlayerDialog
        player={playerTwo}
        openDialog={openPlayerTwo}
        setOpenDialog={setOpenPlayerTwo}
        handleSubmit={handleSubmit}
      />
    </Grid>
  </Grid>;
};

export default memo(withStyles(styles)(GameHeaderComponent));
