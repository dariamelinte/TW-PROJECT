import { IncomingMessage } from "http";
import { IResponseData } from "../routers/interfaces";

const destructureRequestMiddleware = 
(req: IncomingMessage, res: IResponseData): 
{ req: IncomingMessage, res: IResponseData, continue: boolean } => {
  // Get the body of the request if there is one
  let body: string | null = null;
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = body;
    });
  }

  // Add the body to the res.locals object
  res.locals.body = JSON.parse(body || '{}');

  // Add the url to the res.locals object
  res.locals.url = req.url;

  // Add the method to the res.locals object
  res.locals.method = req.method;

  return { req, res, continue: true };
};

export default destructureRequestMiddleware;