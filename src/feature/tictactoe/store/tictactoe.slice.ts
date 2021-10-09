import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkGame } from '../function/check-game';
import { PlayerIndex, TakeTurnPayloadType, TicTacToeStateType } from '../type/tictactoe';
import {
  initialGame,
  initialState,
  initialStatus,
} from './tictactoe.constant';

const tictactoeSlice = createSlice({
  name: 'tictactoe',
  initialState,
  reducers: {
    takeTurn: (state: TicTacToeStateType, action: PayloadAction<TakeTurnPayloadType>) => {
      const { row, col, player } = action.payload;
      state.game[row][col] = player;

      const nextStatus = checkGame(state.game);
      let nextTurn = state.status.turn + 1;
      const numPlayers = state.players.length;
      nextTurn = (nextTurn % numPlayers) as PlayerIndex;
      state.status = {
        turn: nextTurn as PlayerIndex,
        ...nextStatus,
      };
    },
    reset: (state: TicTacToeStateType) => {
      state.game = [...initialGame];
      state.status = {
        ...initialStatus,
      };
    },
  },
});

export const { takeTurn, reset } = tictactoeSlice.actions;
export default tictactoeSlice.reducer;
