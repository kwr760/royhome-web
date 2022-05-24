import type { Action, Dispatch, Reducer } from '@reduxjs/toolkit';
import { useReducer, useEffect, useRef } from 'react';
import { StateType } from '../contracts/tictactoe.models';

const useReducerWithMiddleware = (
  reducer: Reducer,
  initialState: StateType,
  middleware: [(action: Action, state: StateType) => StateType],
  afterware: [(action: Action | undefined, state: StateType) => StateType],
): [StateType, Dispatch] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const aRef = useRef<Action>();

  const dispatchWithMiddleware = (action: Action) => {
    middleware.forEach((middlewareFn) =>
      middlewareFn(action, state),
    );

    aRef.current = action;

    dispatch(action);
  };

  useEffect(() => {
    if (!aRef.current) return;

    afterware.forEach((afterwareFn) =>
      afterwareFn(aRef.current, state),
    );

    aRef.current = undefined;
  }, [afterware, state]);

  return [state, dispatchWithMiddleware as Dispatch];
};

export { useReducerWithMiddleware };
