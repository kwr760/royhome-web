import React, { createContext, useContext, useReducer } from 'react';
import { checkGame } from '../function/check-game';
import { initialGame, initialPlayers, initialStatus } from './tictactoe.constant';
import {
  PlayerType,
  ProviderType,
  ActionsType,
  ContextType,
  StateType, ColIndexType, RowIndexType, GameType, StatusType, PlayersType,
} from '../type/tictactoe';

const TicTacToeContext = createContext<ContextType | undefined>(undefined);

const updateGame = (game: GameType, update: { row: RowIndexType, col: ColIndexType, player: PlayerType }) => {
  const newGame = JSON.parse(JSON.stringify(game));
  newGame[update.row][update.col] = update.player;
  return newGame;
};

const updateTurn = (status: StatusType, players: PlayersType) => {
  const nextTurn = status.turn + 1;
  const numPlayers = players.length;
  return (nextTurn % numPlayers) as PlayerType;
};

const ticTacToeReducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case 'takeTurn': {
      const { row, col, player } = action.payload;
      const { game, status, players } = state;
      const newGame = updateGame(game, { row, col, player});
      const nextStatus = checkGame(newGame);
      const nextTurn = updateTurn(status, players);
      return {
        ...state,
        game: newGame,
        status: {
          ...nextStatus,
          turn: nextTurn,
        },
      };
    }
    case 'reset': {
      return {
        ...state,
        game: [...initialGame],
        status: {
          ...initialStatus,
        },
      };
    }
  }
  return state;
};

export const TicTacToeProvider = (
  {state: seededState, reducer: seededReducer, children}: ProviderType,
): JSX.Element => {
  const initialState = seededState || {
    players: [...initialPlayers],
    game: [...initialGame],
    status: {...initialStatus},
  };
  const initialReducer = seededReducer || ticTacToeReducer;
  const [state, dispatch] = useReducer(initialReducer, initialState);

  const value = {state, dispatch} as ContextType;

  return (
    <TicTacToeContext.Provider value={value}>
      {children}
    </TicTacToeContext.Provider>
  );
};

export const useTicTacToe = (): ContextType => {
  const context = useContext(TicTacToeContext);
  if (context === undefined) {
    throw new Error('useTicTacToe must be used within a TicTacToeProvider');
  }
  return context;
};
