import React, { FunctionComponent, memo } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { useTicTacToe } from '../context/context';
import { reset } from '../context/context.actions';
import { StatusEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-footer.styles';

const isActive = (state: StatusEnum) => state === StatusEnum.Active;
const hasWinner = (state: StatusEnum) => state === StatusEnum.Win;
const hasTie = (state: StatusEnum) => state === StatusEnum.Tie;

type GameFooterProps = WithStyles<typeof styles>;
export const GameFooterComponent: FunctionComponent<GameFooterProps> = ({classes}) => {
  const {
    state: {
      status,
    },
    dispatch,
  } = useTicTacToe();
  const clickReset = () => {
    dispatch(reset());
  };

  return (
    <Grid justifyContent="space-between" container className={classes.footer}>
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
    </Grid>
  );
};

export default memo(withStyles(styles)(GameFooterComponent));
