import React, { FunctionComponent, memo } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { reset } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-footer.styles';

type GameFooterProps = WithStyles<typeof styles>;
export const GameFooterComponent: FunctionComponent<GameFooterProps> = ({classes}) => {
  const {
    state: {
      gameState,
    },
    dispatch,
  } = useTicTacToe();
  let status = '';
  switch (gameState) {
    case GameStateEnum.Active:
      status = 'Game is being played';
      break;
    case GameStateEnum.Win:
      status = 'There is a winner';
      break;
    case GameStateEnum.Tie:
      status = 'Two losers';
      break;
  }
  const clickReset = () => {
    dispatch(reset());
  };

  return (
    <Grid justifyContent="space-between" container className={classes.footer}>
      <Grid item className={classes.status} >
        <Typography>
          { status }
        </Typography>
      </Grid>
      <Grid item>
        <Button className={classes.button} onClick={clickReset}>
          <Typography>
            Reset
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(withStyles(styles)(GameFooterComponent));
