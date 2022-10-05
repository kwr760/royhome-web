import { useEffect } from 'react';
import { takeTurn } from '../context/context.actions';
import { useTicTacToe } from '../context/context.provider';
import { GameStateEnum, PlayerEnum, PlayerTypeEnum } from '../contracts/tictactoe.enum';
import { evaluateNextMove } from '../functions/evaluate-next-move';

export const useAI = () => {
  const { state, dispatch } = useTicTacToe();
  const { turn, board, playerOne, playerTwo, gameState } = state;

  useEffect(() => {
    const player = turn === PlayerEnum.One ? playerOne : playerTwo;
    const automatedTurn = () => {
      const position = evaluateNextMove({ board: board, player: player.piece });
      dispatch(takeTurn({ position, player: player.piece }));
    };

    switch (gameState) {
      case GameStateEnum.Active: {
        if (player.type === PlayerTypeEnum.Computer) {
          automatedTurn();
        }
        break;
      }
    }
  }, [dispatch, board, gameState, turn, playerOne, playerTwo]);
};
