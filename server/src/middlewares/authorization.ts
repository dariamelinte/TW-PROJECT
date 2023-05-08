import { IncomingMessage, ServerResponse } from "http";
import jwt from 'jsonwebtoken';
import { IResponseData } from "../routers/interfaces";

const authorizationMiddleware = 
(req: IncomingMessage, res: IResponseData): 
{ req: IncomingMessage, res: IResponseData, continue: boolean } => {
  // Get the token from the cookie
  const token = req.headers.cookie?.split('=')[1];

  // If there is no token, return a 401
  if (!token) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Unauthorized' }));
    return { req, res, continue: false };
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };
    res.locals.userId = decoded.userId;

    return { req, res, continue: true };
  } catch (err) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    return { req, res, continue: false};
  }
}

export default authorizationMiddleware;

