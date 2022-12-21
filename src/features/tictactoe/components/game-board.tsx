import { Box, Grid } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo } from 'react';
import { useAI } from '../hooks/use-ai';
import { useWebsocket } from '../hooks/use-websocket';
import { styles } from '../styles/game-board.styles';
import GameSquare from './game-square';

type GameBoardProps = WithStyles<typeof styles>;
const GameBoardComponent: FunctionComponent<GameBoardProps> = ({ classes }) => {
  useWebsocket();
  useAI();

  return (
    <>
      <Box>
        <Grid container className={classes.grid} >
          {
            [...Array(3).keys()].map((row) => {
              return (
                <Grid container item className={classes.row} xs={12} key={`row-${row}`} >
                  {
                    [...Array(3).keys()].map((col) => {
                      const position = row * 3 + col;
                      return (
                        <Grid item className={classes.item} xs={4} key={`square-${position}`}>
                          <GameSquare position={position} />
                        </Grid>
                      );
                    })
                  }
                </Grid>
              );
            })
          }
        </Grid>
      </Box>
    </>
  );
};

export default memo(withStyles(styles)(GameBoardComponent));
