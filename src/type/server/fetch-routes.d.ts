export interface ResumeFetchType {
  resume: {
    email: string;
    [email: string]: unknown;
  }
}
export interface RouteFetchType {
  path: string;
  exact: boolean;
  fetchData: () => Promise<ResumeFetchType>;
}

