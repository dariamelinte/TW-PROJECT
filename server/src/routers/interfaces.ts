import { IncomingMessage, ServerResponse } from "http";

export interface IResponseData extends ServerResponse<IncomingMessage> {
  locals: {
    body: any;
    url: string | undefined;
    method: string | undefined;
    userId: string | undefined;
  }
}