import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';
import GameBoard from '../../../../src/features/tictactoe/components/game-board';
import { themeLight } from '../../../../src/theme-light';

jest.mock( '../../../../src/features/tictactoe/components/game-square',
  () => jest.fn(() => <div>Game Square</div>),
);

describe('feature/tictactoe/component/game-board', () => {
  it('should render', () => {
    // Arrange/Act
    const { getAllByText } = render(
      <ThemeProvider theme={themeLight}>
        <GameBoard />
      </ThemeProvider>,
    );

    // Assert
    const squares = getAllByText(/Game Square/);
    expect(squares.length).toBe(9);
  });
});
