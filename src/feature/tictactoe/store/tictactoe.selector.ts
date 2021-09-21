import { createSelector } from 'reselect';
import { StateType } from '../../../type/state/state';
import { TicTacToeStateType } from '../type/state/tictactoe';

export const getPlayerTurn = createSelector(
  (state: StateType) => state.tictactoe,
  (tictactoe: TicTacToeStateType) => tictactoe.playerTurn,
);

export const getPlayers = createSelector(
  (state: StateType) => state.tictactoe,
  (tictactoe: TicTacToeStateType) => tictactoe.players,
);

export const getSquare: (row: number, col: number) => ((state: StateType) => number) &
  {
    resultFunc: (res: TicTacToeStateType) => number;
    recomputations: () => number;
    resetRecomputations: () => number
  } = (row: number, col: number) => createSelector(
    (state: StateType) => state.tictactoe,
    (tictactoe: TicTacToeStateType) => tictactoe.game[row][col],
  );
