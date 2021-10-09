import { createSelector } from 'reselect';
import { StateType } from '../../../type/state/state';
import { ColumnIndexType, GameSquareType, RowIndexType, TicTacToeStateType } from '../type/tictactoe';

export const getPlayers = createSelector(
  (state: StateType) => state.tictactoe,
  (tictactoe: TicTacToeStateType) => tictactoe.players,
);

export const getGameStatus = createSelector(
  (state: StateType) => state.tictactoe,
  (tictactoe: TicTacToeStateType) => tictactoe.status,
);

export const getSquare: (row: RowIndexType, col: ColumnIndexType) => ((state: StateType) => GameSquareType) =
  (row: RowIndexType, col: ColumnIndexType) => createSelector(
    (state: StateType) => state.tictactoe,
    (tictactoe: TicTacToeStateType) => tictactoe.game[row][col],
  );
