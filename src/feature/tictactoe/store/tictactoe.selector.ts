import { createSelector } from 'reselect';
import { StateType } from '../../../type/state/state';
import { PlayerIndex, TicTacToeStateType } from '../type/state/tictactoe';

export const getPlayerTurn = createSelector(
  (state: StateType) => state.tictactoe,
  (tictactoe: TicTacToeStateType) => tictactoe.playerTurn,
);

export const getPlayers = createSelector(
  (state: StateType) => state.tictactoe,
  (tictactoe: TicTacToeStateType) => tictactoe.players,
);

export const getSquare: (row: number, col: number) => ((state: StateType) => PlayerIndex) &
  {
    resultFunc: (res: TicTacToeStateType) => PlayerIndex;
    recomputations: () => PlayerIndex;
    resetRecomputations: () => PlayerIndex
  } = (row: number, col: number) => createSelector(
    (state: StateType) => state.tictactoe,
    (tictactoe: TicTacToeStateType) => tictactoe.game[row][col],
  );

export const getWinner = createSelector(
  (state: StateType) => state.tictactoe,
  (tictactoe: TicTacToeStateType) => tictactoe.winner === undefined ? null : tictactoe.winner,
);
