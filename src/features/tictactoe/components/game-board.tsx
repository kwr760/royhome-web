import { Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import React, { FunctionComponent, memo, useEffect } from 'react';
import { takeTurn } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { evaluateNextMove } from '../functions/evaluate-next-move';
import { isGameActive } from '../functions/is-game-active';
import GameSquare from './game-square';
import { styles } from '../styles/game-board.styles';

type GameBoardProps = WithStyles<typeof styles>;
const GameBoardComponent: FunctionComponent<GameBoardProps> = ({ classes }) => {
  const { state, dispatch } = useTicTacToe();
  const { turn, board, playerOne, playerTwo, gameState } = state;
  const gridClasses = [ classes.grid ];
  if (!isGameActive(gameState)) {
    gridClasses.push(classes.gridDisabled);
  }

  const player = turn === PlayerEnum.One ? playerOne : playerTwo;
  useEffect(() => {
    if (gameState === GameStateEnum.Active && player.type === PlayerTypeEnum.Computer) {
      const position = evaluateNextMove({ board: board, player: player.piece });
      dispatch(takeTurn({ position, player: player.piece }));
    }
  }, [board, dispatch, gameState, player.piece, player.type, turn]);

  return (
    <Grid container className={`${gridClasses.join(' ')}`}>
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

export default memo(withStyles(styles)(GameBoardComponent));
