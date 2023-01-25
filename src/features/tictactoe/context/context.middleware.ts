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
  const aRef = useRef<ActionTypes | undefined>();

  const dispatchWithMiddleware = (action: ActionTypes) => {
    if (beforeware) {
      beforeware.forEach((ware) =>
        ware(action, state),
      );
    }
    aRef.current = action;
    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) {
      return;
    }
    const action = aRef.current;
    if (afterware) {
      afterware.forEach((ware) =>
        ware(action, state),
      );
    }
    aRef.current = undefined;
  }, [afterware, state]);

  return [state, dispatchWithMiddleware as Dispatch];
};

export { useReducerWithMiddleware };
