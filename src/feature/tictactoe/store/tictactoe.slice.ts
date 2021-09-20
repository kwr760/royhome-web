import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicTacToeStateType } from '../type/state/tictactoe';

const initialState: TicTacToeStateType = {
  playerTurn: 0,
  players: ['PLayer #1', 'Player #2'],
  game: [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
};

const tictactoeSlice = createSlice({
  name: 'tictactoe',
  initialState,
  reducers: {
    incrementTurn: (state: TicTacToeStateType) => {
      const nextTurn = state.playerTurn + 1;
      const players = state.players;
      state.playerTurn = nextTurn === players.length ? 0 : nextTurn;
    },
    takeTurn: (state: TicTacToeStateType, action: PayloadAction<{ row: number, col: number, player: number }>) => {
      const { row, col, player } = action.payload;
      state.game[row][col] = player;
    },
  },
});

export const { incrementTurn, takeTurn } = tictactoeSlice.actions;
export default tictactoeSlice.reducer;
