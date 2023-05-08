import dotenv from 'dotenv';
import http from 'http';
import { Pool } from 'pg';

import { IResponseData } from './routers/interfaces';
import destructureRequestMiddleware from './middlewares/destructureRequest';
import authRouter from './routers/auth';
import authorizationMiddleware from './middlewares/authorization';

dotenv.config();

// Create a connection pool to the database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWD),
  port: Number(process.env.DB_PORT),
});

const server = http.createServer((req, res) => {
  // Format the request body and important metadata inside the res.locals object
  const destructuredData = destructureRequestMiddleware(req, res as IResponseData);
  
  let request = destructuredData.req;
  let response = destructuredData.res;
  let continueRequest = destructuredData.continue; 

  if(!continueRequest) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Server error' }));
  }

  // Check if the request is for the auth router
  if (request.url?.startsWith('/auth')) {
    return authRouter(response, pool);
  } else {
    // If the request is not for the auth router, check if the user is authorized
    const authorized = authorizationMiddleware(request, response);
    
    request = authorized.req;
    response = authorized.res;
    continueRequest = authorized.continue;

    if(!continueRequest) {
      response.writeHead(401, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'Unauthorized' }));
    }

    // If the user is authorized, check if the request is for each of the routers
    if(request.url?.startsWith('/user')) {
      return authRouter(response, pool);
    }

    response.writeHead(404, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Not found' }));
  }
});

const PORT = process.env.PORT || 3000;

// Start the server
try{
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);    
    pool.connect((err) => {
      if (err) {
        console.error('Failed to connect to the database:', err);
      } else {
        console.log('Connected to the database');
      }
    });
  });
} catch (err) {
  console.error(err);
}