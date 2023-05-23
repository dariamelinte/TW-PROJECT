const dotenv = require('dotenv');
const http = require('http');
const { Pool } = require('pg');

const destructureRequestMiddleware = require('./middlewares/destructureRequest');
const authorizationMiddleware = require('./middlewares/authorization');
const authRouter = require('./routers/auth');

dotenv.config();

// Create a connection pool to the database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWD),
  port: Number(process.env.DB_PORT)
});


const server = http.createServer((req, res) => {
  console.log('[HERE]', destructureRequestMiddleware);

  // Format the request body and important metadata inside the res.locals object
  let {
    req: request,
    res: response,
    continue: continueRequest
  } = destructureRequestMiddleware(req, res);

  if (!continueRequest) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Server error' }));
  }

  // Check if the request is for the auth router
  if (request.url?.startsWith('/auth')) {
    return authRouter(response, pool);
  }

  // If the request is not for the auth router, check if the user is authorized
  const authorized = authorizationMiddleware(request, response);

  request = authorized.req;
  response = authorized.res;
  continueRequest = authorized.continue;

  if (!continueRequest) {
    response.writeHead(401, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Unauthorized' }));
  }

  // If the user is authorized, check if the request is for each of the routers
  if (request.url?.startsWith('/user')) {
    return authRouter(response, pool);
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  return response.end(JSON.stringify({ message: 'Not found' }));
});

const PORT = process.env.PORT || 3000;

// Start the server
try {
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
