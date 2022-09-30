import { getResumeProxy } from '../proxy/get-resume.proxy';

type ResumeFetch = {
  resume: {
    email: string;
    [email: string]: unknown;
  }
}
type RouteFetch = {
  path: string;
  exact: boolean;
  fetchData: () => Promise<ResumeFetch>;
}
const fetchRoutes: RouteFetch[] = [
  {
    path: '/',
    exact: true,
    fetchData: async (): Promise<ResumeFetch> => {
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
