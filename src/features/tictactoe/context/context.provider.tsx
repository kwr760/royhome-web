import React, { createContext, useContext } from 'react';
import { ContextType, ProviderType } from '../contracts/tictactoe.context';
import { initialState } from '../contracts/tictactoe.initial';
import { StateType } from '../contracts/tictactoe.models';
import { logger, useReducerWithMiddleware } from './context.middleware';
import { ticTacToeReducer } from './context.reducer';

const TicTacToeContext = createContext<ContextType | undefined>(undefined);

const TicTacToeProvider = ({
  sessionId,
  state: seededState,
  reducer: seededReducer,
  children,
}: ProviderType,
): JSX.Element => {
  let newState: StateType = seededState || initialState;
  newState = {
    ...newState,
    sessionId,
  };
  const startReducer = seededReducer || ticTacToeReducer;

  const [state, dispatch] = useReducerWithMiddleware(
    startReducer,
    newState,
    [logger('before')],
    [logger('after')],
  );

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
