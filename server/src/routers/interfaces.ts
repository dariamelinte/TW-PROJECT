export interface IRequestData {
  url?: string;
  method?: string;
  body?: JSON;
}

export interface IRouterResponse {
  statusCode: number;
  headers: { [key: string]: string };
  body: string;
}