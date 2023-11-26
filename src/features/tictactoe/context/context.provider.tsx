import type { Reducer } from '@reduxjs/toolkit';
import React, { createContext, useContext } from 'react';
import { randomNames } from '../contracts/tictactoe.constant';
import { ContextType, ProviderType } from '../contracts/tictactoe.context';
import { initialState } from '../contracts/tictactoe.initial';
import { StateType } from '../contracts/tictactoe.models';
import { useReducerWithMiddleware } from './context.middleware';
import { contextReducer } from './context.reducer';

const TicTacToeContext = createContext<ContextType | undefined>(undefined);

const TicTacToeProvider = ({
  sessionId,
  user,
  state: seededState,
  reducer: seededReducer,
  beforeware,
  afterware,
  children,
}: ProviderType,
): JSX.Element => {
  let newState: StateType = seededState || initialState;
  const { playerOne, playerTwo } = newState;
  playerOne.name = user?.name || playerOne.name;
  playerTwo.name = randomNames[Math.floor(Math.random()*randomNames.length)];
  newState = {
    ...newState,
    sessionId,
    playerOne,
    playerTwo,
  };
  const startReducer: Reducer = seededReducer as Reducer || contextReducer as Reducer;

  const [state, dispatch] = useReducerWithMiddleware(
    startReducer,
    newState,
    beforeware,
    afterware,
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
