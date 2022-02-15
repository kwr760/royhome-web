import React, { createContext, useContext, useReducer } from 'react';
import { ContextType, ProviderType } from '../contracts/tictactoe.context';
import { initialState } from '../contracts/tictactoe.initial';
import { ticTacToeReducer } from './context.reducer';

const TicTacToeContext = createContext<ContextType | undefined>(undefined);

const TicTacToeProvider = (
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

const useTicTacToe = (): ContextType => {
  const context = useContext(TicTacToeContext);
  if (context === undefined) {
    throw new Error('useTicTacToe must be used within a TicTacToeProvider');
  }
  return context;
};

export { TicTacToeProvider, useTicTacToe };
