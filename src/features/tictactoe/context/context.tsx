import React, { createContext, useContext, useReducer } from 'react';
import { PlayerEnum } from '../contracts/tictactoe.enum';
import { initialTicTacToeState } from '../contracts/tictactoe.initial';
import { ActionsType, ContextType, ProviderType, TicTacToeStateType } from '../contracts/tictactoe.context';
import { checkGame } from '../functions/check-game';
import { replaceAt } from '../functions/replace-at';

const TicTacToeContext = createContext<ContextType | undefined>(undefined);

const ticTacToeReducer = (state: TicTacToeStateType, action: ActionsType) => {
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
        ...initialTicTacToeState,
      };
    }
  }
  return state;
};

const TicTacToeProvider = (
  {state: seededState, reducer: seededReducer, children}: ProviderType,
): JSX.Element => {
  const startState = seededState || {
    ...initialTicTacToeState,
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

const useTicTacToe = (): ContextType => {
  const context = useContext(TicTacToeContext);
  if (context === undefined) {
    throw new Error('useTicTacToe must be used within a TicTacToeProvider');
  }
  return context;
};

export { TicTacToeProvider, useTicTacToe };
