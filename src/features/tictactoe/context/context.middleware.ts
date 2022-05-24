import type { Action, Dispatch, Reducer } from '@reduxjs/toolkit';
import React, { useRef } from 'react';
import { StateType } from '../contracts/tictactoe.models';

const logger = (title: string) => (action: Action | undefined, state: StateType): StateType => {
  console.log(`logger ${title}:`, action, state);
  return state;
};

const useReducerWithMiddleware = (
  reducer: Reducer,
  initialState: StateType,
  middleware: [(action: Action, state: StateType) => StateType],
  afterware: [(action: Action | undefined, state: StateType) => StateType],
): [StateType, Dispatch] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const aRef = useRef<Action>();

  const dispatchWithMiddleware = (action: Action) => {
    middleware.forEach((middlewareFn) =>
      middlewareFn(action, state),
    );
    aRef.current = action;
    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) {
      return;
    }
    afterware.forEach((afterwareFn) =>
      afterwareFn(aRef.current, state),
    );
    aRef.current = undefined;
  }, [afterware, state]);

  return [state, dispatchWithMiddleware as Dispatch];
};

export { logger, useReducerWithMiddleware };
