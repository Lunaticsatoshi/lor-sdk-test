export class ApiResponseError extends Error {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  error: Record<string, any>;
  constructor(
    status: number,
    statusText: string,
    headers: Record<string, string>,
    error: Record<string, any>,
  ) {
    super();
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.error = error;
  }
}
