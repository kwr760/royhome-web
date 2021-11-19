import { getResumeProxy } from '../proxy/get-resume.proxy';

interface ResumeFetchType {
  resume: {
    email: string;
    [email: string]: unknown;
  }
}
interface RouteFetchType {
  path: string;
  exact: boolean;
  fetchData: () => Promise<ResumeFetchType>;
}
const fetchRoutes: RouteFetchType[] = [
  {
    path: '/',
    exact: true,
    fetchData: async (): Promise<ResumeFetchType> => {
      const email = 'kroy760@gmail.com';
      const resume = await getResumeProxy(email);
      return {
        resume: {
          email: email,
          resumes: {
            [email]: resume,
          },
        },
      };
    },
  },
];

export { fetchRoutes };
