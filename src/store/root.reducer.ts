import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from './session/session.slice';
import resumeReducer from '../feature/resume/store/resume.slice';
import tictactoeReducer from '../feature/tictactoe/store/tictactoe.slice';

const rootReducer = combineReducers({
  session: sessionReducer,
  resume: resumeReducer,
  tictactoe: tictactoeReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
