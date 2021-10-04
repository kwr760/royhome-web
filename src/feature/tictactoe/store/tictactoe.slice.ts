import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkGame } from '../function/check-game';
import { TicTacToeStateType } from '../type/state/tictactoe';

export const initialPlayerTurn = 0;
export const initialPlayers = ['Player #1', 'Player #2'];
export const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export const initialState: TicTacToeStateType = {
  playerTurn: initialPlayerTurn,
  players: initialPlayers,
  game: initialGame,
};

const tictactoeSlice = createSlice({
  name: 'tictactoe',
  initialState,
  reducers: {
    takeTurn: (state: TicTacToeStateType, action: PayloadAction<{ row: number, col: number, player: number }>) => {
      const { row, col, player } = action.payload;
      state.game[row][col] = player;
      const winner = checkGame(state.game);
      if (winner !== null) {
        state.winner = winner;
      } else {
        const nextTurn = state.playerTurn + 1;
        const numPlayers = state.players.length;
        state.playerTurn = (nextTurn % numPlayers);
      }
    },
  },
});

export const { takeTurn } = tictactoeSlice.actions;
export default tictactoeSlice.reducer;
