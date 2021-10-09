import { Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useMemo } from 'react';
import { useTicTacToe } from '../context';
import { reset } from '../context/context.actions';
import { GameState } from '../context/tictactoe.constant';
import { useStyles } from './game-footer.styles';

const isActive = (state: GameState) => state === GameState.Active;
const hasWinner = (state: GameState) => state === GameState.Win;
const hasTie = (state: GameState) => state === GameState.Tie;
export const GameFooter: FunctionComponent = () => {
  const classes = useStyles();
  const {
    state: {
      status: { state: gameState },
    },
    dispatch,
  } = useTicTacToe();
  return useMemo(() => {
    const clickReset = () => {
      dispatch(reset());
    };
    return (<Grid justifyContent="space-between" container className={classes.footer}>
      <Grid item className={classes.status} >
        {isActive(gameState) &&
        <Typography>
          Game is being played
        </Typography>
        }
        {hasWinner(gameState) &&
        <Typography>
          There is a winner
        </Typography>
        }
        {hasTie(gameState) &&
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
    </Grid>);
  }, [classes.button, classes.footer, classes.status, dispatch, gameState]);
};

export default GameFooter;
