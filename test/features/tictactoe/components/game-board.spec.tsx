import React, { Reducer } from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';
import GameBoard from '../../../../src/features/tictactoe/components/game-board';
import { TicTacToeProvider } from '../../../../src/features/tictactoe/context/context.provider';
import { initialTicTacToeState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { TicTacToeStateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { themeLight } from '../../../../src/theme-light';

jest.mock( '../../../../src/features/tictactoe/components/game-square',
  () => jest.fn(() => <div>Game Square</div>),
);

describe('feature/tictactoe/component/game-board', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: TicTacToeStateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <ThemeProvider theme={themeLight}>
        <TicTacToeProvider state={initialState} reducer={reducer}>
          <GameBoard />
        </TicTacToeProvider>
      </ThemeProvider>
    );
  };

  it('should render', () => {
    // Arrange/Act
    const state = {
      ...initialTicTacToeState,
    };
    const { getAllByText } = render(getComponent(state, emptyReducer));

    // Assert
    const squares = getAllByText(/Game Square/);
    expect(squares.length).toBe(9);
  });
});
