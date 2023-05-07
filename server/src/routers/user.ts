import { IncomingMessage, ServerResponse } from "http";
import { Pool } from "pg";
import { IRequestData } from "./interfaces";

async function userRouter (data: IRequestData, res: ServerResponse<IncomingMessage>, pool: Pool): Promise<ServerResponse<IncomingMessage>> {
  try{
    // Remove the '/user/' from the url
    const url = data.url?.replace(/^\/user\//, '');

    // TODO: Add the appropriate logic to handle the request
    return res;
  } catch (err) {
    console.error(err);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));

    return res;
  }
}

export default userRouter;