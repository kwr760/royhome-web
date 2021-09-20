import { SessionStateType } from './session';
import { ResumeStateType } from '../../feature/resume/type/state/resume';
import { TicTacToeStateType } from '../../feature/tictactoe/type/state/tictactoe';

export interface StateType {
  session: SessionStateType,
  resume: ResumeStateType,
  tictactoe: TicTacToeStateType,
}
