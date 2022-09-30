import { mockGetResume } from './mocks/mock-get-resume';
import { mockGetSession } from './mocks/mock-get-session';
import { mockPutLog } from './mocks/mock-put-log';
import { mockPostSession } from './mocks/mock-post-session';

export interface MockRoute {
  method?: string,
  route?: string,
  mock: unknown,
}
export const routes: MockRoute[] = [
  {
    method: 'GET',
    route: 'resume',
    mock: mockGetResume,
  },
  {
    method: 'GET',
    route: 'session',
    mock: mockGetSession,
  },
  {
    method: 'POST',
    route: 'session',
    mock: mockPostSession,
  },
  {
    method: 'PUT',
    route: 'log',
    mock: mockPutLog,
  },
];
