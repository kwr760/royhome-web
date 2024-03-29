/* eslint-disable import/export */
import { ThemeProvider } from '@mui/styles';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render as baseRender } from '@testing-library/react';
import type { Reducer } from 'react';
import React, { FC, ReactElement } from 'react';
import { Auth0User } from '../../../../src/contracts/auth0.models';
import { TicTacToeProvider as Provider } from '../../../../src/features/tictactoe/context/context.provider';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

const noop = () => {};

type CustomRender = {
  sessionId?: string,
  user?: Auth0User,
  state?: StateType,
  reducer?: Reducer<unknown, unknown>
};

const customRender = (
  ui: ReactElement,
  options?: RenderOptions & CustomRender,
): RenderResult => {
  const {
    sessionId = 'session-id',
    user = { userId: 'id' },
    state = initialState,
    reducer = noop,
    ...renderOptions
  } = options || {};
  const Wrapper: FC<{children: React.ReactNode}> = ({ children }) => {
    return (
      <ThemeProvider theme={themeLight}>
        <Provider
          sessionId={sessionId}
          user={user}
          state={state}
          reducer={reducer}
          beforeware={[]}
          afterware={[]}
        >
          {children}
        </Provider>
      </ThemeProvider>
    );
  };
  return baseRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render };
