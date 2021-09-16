import { Container, Grid } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import GameSquare from './game-square';
import { useStyles } from './index.styles';

const TicTacToe: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container className={classes.grid}>
        {
          [...Array(3).keys()].map((row) => {
            return (
              <Grid container item className={classes.row} xs={12} key={`row-${row}`} >
                {
                  [...Array(3).keys()].map((column) => {
                    return (<Grid item className={classes.item} xs={4} key={`square-${row}-${column}`}>
                      <GameSquare row={row} column={column} />
                    </Grid>);
                  })
                }
              </Grid>
            );
          })
        }
      </Grid>
    </Container>
  );
};

export default TicTacToe;
