import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from './session/session.slice';
import resumeReducer from '../feature/resume/store/resume.slice';

const rootReducer = combineReducers({
  session: sessionReducer,
  resume: resumeReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
