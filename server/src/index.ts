import dotenv from 'dotenv';
import http from 'http';
import { Pool } from 'pg';

import userRouter from './routers/user';
import { IRequestData } from './routers/interfaces';

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
  // Get the body of the request if there is one
  let body
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = body;
    });
  }

  // Create the request data object
  const requestData: IRequestData = {
    url: req.url,
    method: req.method,
    body: body ? JSON.parse(body) : null,
  };

  // Route the request to the appropriate router
  if (req.url?.startsWith('/user')) {
    return userRouter(requestData, res, pool);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
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