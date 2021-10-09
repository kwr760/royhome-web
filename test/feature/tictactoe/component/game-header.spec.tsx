import React, { Reducer } from 'react';
import { render } from '@testing-library/react';
import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';
import { GameHeader } from '../../../../src/feature/tictactoe/component/game-header';
import { TicTacToeProvider } from '../../../../src/feature/tictactoe/context';
import { GameState, initialGame, initialPlayers } from '../../../../src/feature/tictactoe/context/tictactoe.constant';
import { PlayerType, StateType } from '../../../../src/feature/tictactoe/type/tictactoe';

jest.mock('react-icons/fa');

describe('feature/tictactoe/component/game-header', () => {
  const emptyReducer = jest.fn();
  const getComponent = (initialState: StateType, reducer: Reducer<unknown, unknown>) => {
    return (
      <TicTacToeProvider state={initialState} reducer={reducer}>
        <GameHeader />
      </TicTacToeProvider>
    );
  };
  it('should render', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: {
        state: GameState.Active,
        turn: 1 as PlayerType,
      },
    };
    (RightArrow as jest.Mock).mockImplementation(() => 'Right Arrow');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Player #1/);
    getByText(/Right Arrow/);
    getByText(/Player #2/);
  });
  it('should render as Left Arrow', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: {
        state: GameState.Active,
        turn: 0 as PlayerType,
      },
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    getByText(/Player #1/);
    getByText(/Left Arrow/);
    getByText(/Player #2/);
  });
  it('should render as Tie', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: {
        state: GameState.Tie,
        turn: 0 as PlayerType,
      },
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    const playerOneClassName = getByText(/Player #1/).className;
    expect(playerOneClassName).toContain('loser');
    const playerTwoClassName = getByText(/Player #2/).className;
    expect(playerTwoClassName).toContain('loser');
  });
  it('should render as Win', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: {
        state: GameState.Win,
        turn: 0 as PlayerType,
        winner: 1 as PlayerType,
      },
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    const playerOneClassName = getByText(/Player #1/).className;
    expect(playerOneClassName).toContain('loser');
    const playerTwoClassName = getByText(/Player #2/).className;
    expect(playerTwoClassName).toContain('winner');
  });
});
