import { Resume } from './resume.models';

interface ResumeStateType {
  email: string,
  resumes: {
    [key: string]: Resume,
  },
  error?: string,
}

export type { ResumeStateType };
