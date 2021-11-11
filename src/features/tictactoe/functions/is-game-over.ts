import { PlayerEnum } from '../constants/tictactoe.constant';
import { GameType } from '../types/tictactoe';

export const isGameOver = (game: GameType): boolean => {
  const squares = game.split('');
  return squares.filter(v => v === PlayerEnum.None).length === 0;
};
