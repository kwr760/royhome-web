import { useEffect } from 'react';
import { takeTurn } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { evaluateNextMove } from '../functions/evaluate-next-move';
import { getCurrentPlayer } from '../functions/get-current-player';
import { getCurrentTurn } from '../functions/get-current-turn';

export const useAI = (): void => {
  const { state, dispatch } = useTicTacToe();
  const { board, playerOne, playerTwo, gameState } = state;

  useEffect(() => {
    const turn = getCurrentTurn(board);
    const player = getCurrentPlayer(board, playerOne, playerTwo);
    const automatedTurn = () => {
      const position = evaluateNextMove({ board: board, player: turn });
      dispatch(takeTurn({ position, player: turn }));
    };

    switch (gameState) {
      case GameStateEnum.Active: {
        if (player && player.type === PlayerTypeEnum.Computer) {
          automatedTurn();
        }
        break;
      }
    }
  }, [dispatch, board, gameState, playerOne, playerTwo]);
};
