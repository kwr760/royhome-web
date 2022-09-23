import type { Action, Dispatch, Reducer } from '@reduxjs/toolkit';
import React, { useRef } from 'react';
import type { MiddleWareFunction } from '../contracts/tictactoe.context';
import { StateType } from '../contracts/tictactoe.models';

const logger = (title?: string) => (action: Action | undefined, state: StateType): StateType => {
  let logHeader = 'action->state';
  if (title) {
    logHeader += ' ' + title;
  }
  console.log(logHeader, action, state);
  return state;
};


const useReducerWithMiddleware = (
  reducer: Reducer,
  initialState: StateType,
  beforeware?: MiddleWareFunction[],
  afterware?: MiddleWareFunction[],
): [StateType, Dispatch] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const aRef = useRef<Action>();

  const dispatchWithMiddleware = (action: Action) => {
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
    if (afterware) {
      afterware.forEach((ware) =>
        ware(aRef.current, state),
      );
    }
    aRef.current = undefined;
  }, [afterware, state]);

  return [state, dispatchWithMiddleware as Dispatch];
};

export { logger, useReducerWithMiddleware };
