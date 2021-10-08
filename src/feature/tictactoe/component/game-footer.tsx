import { Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameStatus } from '../store/tictactoe.selector';
import { reset } from '../store/tictactoe.slice';
import { GameState } from '../store/tictactoe.constant';
import { useStyles } from './game-footer.styles';

export const GameFooter: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { state: gameState } = useSelector(getGameStatus);
  const isActive = gameState === GameState.Active;
  const hasWinner = gameState === GameState.Win;
  const hasTie = gameState === GameState.Tie;
  const clickReset = () => {
    dispatch(reset());
  };
  return <Grid justifyContent="space-between" container className={classes.footer}>
    <Grid item className={classes.status} >
      {isActive &&
      <Typography>
        Game is being played
      </Typography>
      }
      {hasWinner &&
      <Typography>
        There is a winner
      </Typography>
      }
      {hasTie &&
      <Typography>
        Two losers
      </Typography>
      }
    </Grid>
    <Grid item>
      <Button className={classes.button} onClick={clickReset}>
        <Typography>
          Reset
        </Typography>
      </Button>
    </Grid>
  </Grid>;
};

export default GameFooter;
