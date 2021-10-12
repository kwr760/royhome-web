import { Grid } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { GameSquare } from './game-square';
import { useStyles } from '../style/game-board.styles';

export const GameBoard: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid}>
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
  );
};

export default GameBoard;
