import { IncomingMessage, ServerResponse } from "http";
import { Pool } from "pg";
import { IResponseData } from "./interfaces";

async function userRouter (res: IResponseData, pool: Pool): Promise<ServerResponse<IncomingMessage>> {
  try{
    // TODO: Implement user router
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from user' }));

    return res;
  } catch (err) {
    console.error(err);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));

    return res;
  }
}

export default userRouter;