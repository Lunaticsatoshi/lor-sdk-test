export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface RequestParameters {
  path: string;
  method: Method;
  apiKey?: string;
  query?: QueryParams;
  body?: Record<string, unknown>;
  maxRetries?: number;
}

export type ResponseBody = {
  docs: Array<Movie | Quote>;
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
};

export interface AuthHeader {
  Authorization: string;
}

/*
 * Type aliases to support the generic request interface.
 */
export type Method = 'get' | 'post' | 'patch' | 'delete';
export type QueryParams =
  | Record<string, string | number | string[]>
  | URLSearchParams;

export type SuccessStatus = 200 | 201;
export type ResponseType = 'application/json';

export type IdRequest = string | string;

export type GetMoviePathParameters = {
  movieId: IdRequest;
};

export type GetMovieParameters = GetMoviePathParameters;

export type Pagination = {
  limit: number;
  page: number;
  offset?: number;
};

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export type Movie = {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
};

export type Quote = {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
  id: string;
};
