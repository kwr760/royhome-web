import { ResumeType } from '../object/resume';

export interface ResumeStateType {
  email: string,
  resumes: {
    [key: string]: ResumeType,
  },
  error?: string,
}
