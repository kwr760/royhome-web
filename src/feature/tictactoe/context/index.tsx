import React, { createContext, useContext, useReducer } from 'react';
import { checkGame } from '../function/check-game';
import {
  initialState,
  PlayerEnum,
} from '../constant/tictactoe.constant';
import { replaceAt } from '../function/replace-at';
import {
  ProviderType,
  ActionsType,
  ContextType,
  StateType,
} from '../type/tictactoe';

const TicTacToeContext = createContext<ContextType | undefined>(undefined);

const ticTacToeReducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case 'takeTurn': {
      const { position, player } = action.payload;
      const { game } = state;
      const newGame = replaceAt(game, position, player.toString());
      const { status, winner } = checkGame(newGame);
      const turn = player === PlayerEnum.One ? PlayerEnum.Two : PlayerEnum.One;
      return {
        ...state,
        game: newGame,
        status,
        turn,
        winner,
      };
    }
    case 'reset': {
      return {
        ...initialState,
      };
    }
  }
  return state;
};

export const TicTacToeProvider = (
  {state: seededState, reducer: seededReducer, children}: ProviderType,
): JSX.Element => {
  const startState = seededState || {
    ...initialState,
  };
  const startReducer = seededReducer || ticTacToeReducer;
  const [state, dispatch] = useReducer(startReducer, startState);

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
