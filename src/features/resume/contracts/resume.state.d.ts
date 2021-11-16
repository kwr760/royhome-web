import { ResumeType } from './resume.models';

interface ResumeStateType {
  email: string,
  resumes: {
    [key: string]: ResumeType,
  },
  error?: string,
}

export { ResumeStateType };
