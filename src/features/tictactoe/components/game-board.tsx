import { Box, Grid } from '@mui/material';
import type { WithStyles } from '@mui/styles';
import { withStyles } from '@mui/styles';
import React, { FunctionComponent, memo, useCallback, useEffect, useMemo } from 'react';
import { takeTurn } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { evaluateNextMove } from '../functions/evaluate-next-move';
import { styles } from '../styles/game-board.styles';
import GameControl from './game-control';
import GameSquare from './game-square';
import GameStatus from './game-status';

type GameBoardProps = WithStyles<typeof styles>;
const GameBoardComponent: FunctionComponent<GameBoardProps> = ({ classes }) => {
  const [openControl, setOpenControl] = React.useState(true);
  const [openStatus, setOpenStatus] = React.useState(false);
  const { state, dispatch } = useTicTacToe();
  const { turn, board, playerOne, playerTwo, gameState } = state;
  const gridClasses = useMemo(() => [ classes.grid ], [classes.grid]);
  const player = turn === PlayerEnum.One ? playerOne : playerTwo;
  const automatedTurn = useCallback(() => {
    const position = evaluateNextMove({ board: board, player: player.piece });
    dispatch(takeTurn({ position, player: player.piece }));
  }, [board, dispatch, player.piece]);
  const displayControl = () => {
    if (gameState !== GameStateEnum.Active) {
      setOpenControl(true);
    }
  };

  useEffect(() => {
    switch (gameState) {
      case GameStateEnum.Active: {
        if (player.type === PlayerTypeEnum.Computer) {
          automatedTurn();
        }
        break;
      }
      case GameStateEnum.Setup:
        setOpenControl(true);
        break;
      case GameStateEnum.Message:
      case GameStateEnum.Completed:
        setOpenStatus(true);
        break;
      default: {
        break;
      }
    }
  }, [automatedTurn, gameState, player.type]);

  return (
    <>
      <GameControl
        openDialog={openControl}
        setOpenDialog={setOpenControl}
      />
      <GameStatus
        openStatus={openStatus}
        setOpenStatus={setOpenStatus}
      />
      <Box onClick={displayControl}>
        <Grid container className={`${gridClasses.join(' ')}`} >
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
