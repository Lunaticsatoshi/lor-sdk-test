import { GetMoviePathParameters, SortOrder } from '../types';

export const getMovies = {
  method: 'get',
  pathParams: [],
  sortParams: (order: SortOrder) => ({ sort: `name:${order}`}),
  path: (): string => `movie/`,
} as const;

export const getSingleMovieById = {
  method: 'get',
  pathParams: ['movieId'],
  path: (p: GetMoviePathParameters): string => `movie/${p.movieId}`,
} as const;

export const getSingleMovieQuote = {
  method: 'get',
  pathParams: ['movieId'],
  path: (p: GetMoviePathParameters): string => `movie/${p.movieId}/quote`,
} as const;
