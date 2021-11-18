import { ResumeFetchType, RouteFetchType } from '../type/server/fetch-routes';
import { getResumeProxy } from '../proxy/get-resume.proxy';

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
