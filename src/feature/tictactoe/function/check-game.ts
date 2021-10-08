import { GameState } from '../store/tictactoe.constant';
import { CheckGameReturnType, GameType } from '../type/tictactoe';

const gameSize = 3;
const checkRows = (game: GameType) => {
  for (let i = 0; i < gameSize; i++) {
    let same = true;
    for (let j = 1; same && j < gameSize; j++) {
      if (game[i][0] !== game[i][j]) {
        same = false;
      }
    }
    if (same && game[i][0] !== null) {
      return game[i][0];
    }
  }
  return null;
};
const checkColumns = (game: GameType) => {
  for (let i = 0; i < gameSize; i++) {
    let same = true;
    for (let j = 1; same && j < gameSize; j++) {
      if (game[0][i] !== game[j][i]) {
        same = false;
      }
    }
    if (same && game[0][i] !== null) {
      return game[0][i];
    }
  }
  return null;
};
const checkForwardDiagonal = (game: GameType) => {
  let same = true;
  for (let i = 1; same && i < gameSize; i++) {
    if (game[0][0] !== game[i][i]) {
      same = false;
    }
  }
  if (same) {
    return game[0][0];
  }
  return null;
};
const checkBackwardDiagonal = (game: GameType) => {
  let same = true;
  for (let i = 1; same && i < gameSize; i++) {
    if (game[gameSize - 1 - i][i] !== game[gameSize - 1][0]) {
      same = false;
    }
  }
  if (same) {
    return game[gameSize - 1][0];
  }
  return null;
};
const checkDiagonals = (game: GameType) => {
  let winner = checkForwardDiagonal(game);
  if (winner === null) {
    winner = checkBackwardDiagonal(game);
  }
  return winner;
};
const isGameDone = (game: GameType) => {
  for (let i = 0; i < gameSize; i++) {
    for (let j = 0; j < gameSize; j++) {
      if (game[i][j] === null) {
        return false;
      }
    }
  }
  return true;
};

export const checkGame = (game: GameType): CheckGameReturnType => {
  let winner = checkRows(game);
  if (winner === null) {
    winner = checkColumns(game);
  }
  if (winner === null) {
    winner = checkDiagonals(game);
  }
  if (winner !== null) {
    return {
      state: GameState.Win,
      winner,
    };
  }

  if (isGameDone(game)) {
    return {
      state: GameState.Tie,
    };
  }

  return {
    state: GameState.Active,
  };
};
