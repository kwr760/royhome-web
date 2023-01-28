import type { Dispatch, Reducer } from '@reduxjs/toolkit';
import React, { useRef } from 'react';
import type { ActionTypes, MiddleWareFunction } from '../contracts/tictactoe.context';
import { StateType } from '../contracts/tictactoe.models';

const useReducerWithMiddleware = (
  reducer: Reducer,
  initialState: StateType,
  beforeware?: MiddleWareFunction[],
  afterware?: MiddleWareFunction[],
): [StateType, Dispatch] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const refAction = useRef<ActionTypes | undefined>();
  const refState = useRef<StateType>(state);
  refState.current = state;

  const dispatchWithMiddleware = (action: ActionTypes) => {
    if (beforeware) {
      beforeware.forEach((ware) =>
        ware(action, refState.current),
      );
    }
    refAction.current = action;
    dispatch(action);
  };

  React.useEffect(() => {
    if (!refAction.current) {
      return;
    }
    const action = refAction.current;
    if (afterware) {
      afterware.forEach((ware) =>
        ware(action, state),
      );
    }
    refAction.current = undefined;
  }, [afterware, state]);

  return [state, dispatchWithMiddleware as Dispatch];
};

export { useReducerWithMiddleware };
