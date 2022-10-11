import { ThemeProvider } from '@mui/styles';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render as baseRender } from '@testing-library/react';
import type { Reducer } from 'react';
import React, { FC, ReactElement } from 'react';
import { TicTacToeProvider as Provider } from '../../../../src/features/tictactoe/context/context.provider';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

const noop = () => {};

type CustomRender = {
  sessionId?: string,
  state?: StateType,
  reducer?: Reducer<unknown, unknown>
};

const customRender = (
  ui: ReactElement,
  options?: RenderOptions & CustomRender,
): RenderResult => {
  const {
    sessionId = 'session-id',
    state = initialState,
    reducer = noop,
    ...renderOptions
  } = options || {};
  const Wrapper: FC<{children: React.ReactNode}> = ({ children }) => {
    return (
      <ThemeProvider theme={themeLight}>
        <Provider
          sessionId={sessionId}
          state={state}
          reducer={reducer}
        >
          {children}
        </Provider>
      </ThemeProvider>
    );
  };
  return baseRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { customRender as render };
