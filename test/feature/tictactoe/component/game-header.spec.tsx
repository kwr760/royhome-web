import React, { Reducer } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FaAngleDoubleLeft as LeftArrow, FaAngleDoubleRight as RightArrow } from 'react-icons/fa';
import { GameHeader } from '../../../../src/feature/tictactoe/component/game-header';
import { PlayerDialog } from '../../../../src/feature/tictactoe/component/player-dialog';
import { TicTacToeProvider } from '../../../../src/feature/tictactoe/context';
import {
  initialGame,
  initialPlayers,
  PlayerEnum,
  StatusEnum,
} from '../../../../src/feature/tictactoe/constant/tictactoe.constant';
import { StateType } from '../../../../src/feature/tictactoe/type/tictactoe';

jest
  .mock('../../../../src/feature/tictactoe/component/player-dialog')
  .mock('react-icons/fa');

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
      status: StatusEnum.Active,
      turn: PlayerEnum.Two,
    };
    (RightArrow as jest.Mock).mockImplementation(() => 'Right Arrow');
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    (PlayerDialog as jest.Mock).mockImplementation(() => 'Player Dialog');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));
    fireEvent.click(getByText(/Player #1/));
    fireEvent.click(getByText(/Player #2/));

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
      status: StatusEnum.Active,
      turn: PlayerEnum.One,
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    (PlayerDialog as jest.Mock).mockImplementation(() => 'Player Dialog');

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
      status: StatusEnum.Tie,
      turn: PlayerEnum.One,
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    (PlayerDialog as jest.Mock).mockImplementation(() => 'Player Dialog');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    const playerOneClassName = getByText(/Player #1/).className;
    expect(playerOneClassName).toContain('loser');
    const playerTwoClassName = getByText(/Player #2/).className;
    expect(playerTwoClassName).toContain('loser');
  });
  it('should render One as Win', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: StatusEnum.Win,
      turn: PlayerEnum.One,
      winner: PlayerEnum.One,
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    (PlayerDialog as jest.Mock).mockImplementation(() => 'Player Dialog');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    const playerOneClassName = getByText(/Player #1/).className;
    expect(playerOneClassName).toContain('winner');
    const playerTwoClassName = getByText(/Player #2/).className;
    expect(playerTwoClassName).toContain('loser');
  });
  it('should render Two as Win', () => {
    // Arrange
    const state = {
      players: initialPlayers,
      game: initialGame,
      status: StatusEnum.Win,
      turn: PlayerEnum.One,
      winner: PlayerEnum.Two,
    };
    (LeftArrow as jest.Mock).mockImplementation(() => 'Left Arrow');
    (PlayerDialog as jest.Mock).mockImplementation(() => 'Player Dialog');

    // Act
    const { getByText } = render(getComponent(state, emptyReducer));

    // Assert
    const playerOneClassName = getByText(/Player #1/).className;
    expect(playerOneClassName).toContain('loser');
    const playerTwoClassName = getByText(/Player #2/).className;
    expect(playerTwoClassName).toContain('winner');
  });
});
