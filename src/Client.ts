import fetch from 'isomorphic-unfetch';

import {
  AuthHeader,
  ClientOptions,
  RequestParameters,
  Pagination,
  SortOrder,
  ResponseBody,
} from './types';
import {
  getMovies,
  getSingleMovieById,
  getSingleMovieQuote,
} from './utils/api-endpoints';
import { ApiResponseError } from './utils/error';

export default class Client {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: ClientOptions) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://the-one-api.dev/v2';
  }

  /**
   * Sends a request.
   *
   * @param path
   * @param method
   * @param apiKey
   * @param query
   * @param body
   * @param maxRetries
   * @returns
   */

  private async request<T>({
    path,
    method,
    apiKey,
    query,
    body,
    maxRetries,
  }: RequestParameters): Promise<T> {
    // If the body is empty, don't send the body in the HTTP request
    const bodyAsJsonString =
      !body || Object.entries(body).length === 0
        ? undefined
        : JSON.stringify(body);

    const url = new URL(`${this.baseUrl}/${path}`);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((val) => url.searchParams.append(key, String(val)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      }
    }
    const headers: Record<string, string> = {
      ...this.authAsHeaders(apiKey),
    };

    if (bodyAsJsonString !== undefined) {
      headers['Content-Type'] = 'application/json';
    }
    const config = {
      method: method.toUpperCase(),
      headers,
      body: bodyAsJsonString,
    };

    const response = await this.fetchWithRetries(
      url.toString(),
      config,
      maxRetries,
    );

    if (!response.ok) {
      const error = (await response.json()) as Record<string, any>;
      throw new ApiResponseError(
        response.status,
        response.statusText,
        headers,
        error,
      );
    }

    return (await response.json()) as T;
  }

  public readonly movies = {
    getMovies: async (): Promise<ResponseBody> => {
      return await this.request<ResponseBody>({
        method: getMovies.method,
        path: getMovies.path(),
        maxRetries: 0,
      });
    },

    getMoviesWithQuery: async ({
      pagination,
      sortOrder,
    }: {
      pagination: Pagination;
      sortOrder: SortOrder;
    }): Promise<ResponseBody> => {
      return await this.request<ResponseBody>({
        method: getMovies.method,
        path: getMovies.path(),
        query: { ...pagination, ...getMovies.sortParams(sortOrder) },
        maxRetries: 0,
      });
    },

    getMovieById: async (id: string): Promise<ResponseBody> => {
      return await this.request<ResponseBody>({
        method: getSingleMovieById.method,
        path: getSingleMovieById.path({ movieId: id }),
        maxRetries: 0,
      });
    },

    getMovieQuote: async (id: string): Promise<ResponseBody> => {
      return await this.request<ResponseBody>({
        method: getSingleMovieQuote.method,
        path: getSingleMovieQuote.path({ movieId: id }),
        maxRetries: 0,
      });
    },
  };

  /**
   * Retries an HTTP API request for a specific number of times.
   *
   * This method uses the instance's value as the default when the input is undefined. If neither are defined, it returns
   * an empty object
   *
   * @param url API url
   * @param init Request options
   * @param maxRetries Number of times to retry the api request
   * @returns
   */

  private async fetchWithRetries(
    url: RequestInfo,
    init: RequestInit,
    maxRetries = 0,
  ): Promise<Response> {
    const res = await fetch(url, init);
    if (res.status === 429 && maxRetries > 0) {
      const timeToWait = 1000;
      await new Promise((resolve) => setTimeout(resolve, timeToWait));
      return this.fetchWithRetries(url, init, maxRetries - 1);
    }
    return res;
  }

  /**
   * Transforms an API key or access token into a headers object suitable for an HTTP request.
   *
   * This method uses the instance's value as the default when the input is undefined. If neither are defined, it returns
   * an empty object
   *
   * @param apiKey API key or access token
   * @returns headers key-value object
   */
  private authAsHeaders(apiKey?: string): AuthHeader {
    const headers: AuthHeader = {} as AuthHeader;
    const authHeaderValue = apiKey ?? this.apiKey;
    if (authHeaderValue !== undefined) {
      headers['Authorization'] = `Bearer ${authHeaderValue}`;
    }
    return headers;
  }
}
