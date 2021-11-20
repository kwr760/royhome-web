import React, { FunctionComponent, memo } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { reset } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum } from '../contracts/tictactoe.enum';
import { styles } from '../styles/game-footer.styles';

const isActive = (gameState: GameStateEnum) => gameState === GameStateEnum.Active;
const hasWinner = (gameState: GameStateEnum) => gameState === GameStateEnum.Win;
const hasTie = (gameState: GameStateEnum) => gameState === GameStateEnum.Tie;

type GameFooterProps = WithStyles<typeof styles>;
export const GameFooterComponent: FunctionComponent<GameFooterProps> = ({classes}) => {
  const {
    state: {
      gameState,
    },
    dispatch,
  } = useTicTacToe();
  const clickReset = () => {
    dispatch(reset());
  };

  return (
    <Grid justifyContent="space-between" container className={classes.footer}>
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
    </Grid>
  );
};

export default memo(withStyles(styles)(GameFooterComponent));
