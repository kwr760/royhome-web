import { Button, Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent, useMemo } from 'react';
import { StatusEnum } from '../constant/tictactoe.constant';
import { useTicTacToe } from '../context';
import { reset } from '../context/context.actions';
import { useStyles } from '../style/game-footer.styles';

const isActive = (state: StatusEnum) => state === StatusEnum.Active;
const hasWinner = (state: StatusEnum) => state === StatusEnum.Win;
const hasTie = (state: StatusEnum) => state === StatusEnum.Tie;
export const GameFooter: FunctionComponent = () => {
  const classes = useStyles();
  const {
    state: {
      status,
    },
    dispatch,
  } = useTicTacToe();
  return useMemo(() => {
    const clickReset = () => {
      dispatch(reset());
    };
    return (<Grid justifyContent="space-between" container className={classes.footer}>
      <Grid item className={classes.status} >
        {isActive(status) &&
        <Typography>
          Game is being played
        </Typography>
        }
        {hasWinner(status) &&
        <Typography>
          There is a winner
        </Typography>
        }
        {hasTie(status) &&
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
  }, [classes.button, classes.footer, classes.status, dispatch, status]);
};

export default GameFooter;
