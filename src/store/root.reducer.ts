import { combineReducers } from '@reduxjs/toolkit';
import { trackerReducer } from '../features/tracker/store/tracker.slice';
import { sessionReducer } from './session/session.slice';
import { resumeReducer } from '../features/resume/store/resume.slice';

const rootReducer = combineReducers({
  session: sessionReducer,
  resume: resumeReducer,
  tracker: trackerReducer,
});

type RootState = ReturnType<typeof rootReducer>

export type { RootState };
export { rootReducer } ;
