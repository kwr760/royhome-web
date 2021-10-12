import { PlayerEnum } from '../constant/tictactoe.constant';
import { GameType } from '../type/tictactoe';

export const isGameOver = (game: GameType): boolean => {
  const squares = game.split('');
  return squares.filter(v => v === PlayerEnum.None).length === 0;
};
