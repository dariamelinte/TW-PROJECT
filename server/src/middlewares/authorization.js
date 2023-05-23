const jwt = require('jsonwebtoken');

const authorizationMiddleware = (req, res) => {
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
    const { userId } = jwt.verify(token, process.env.JWT_SECRET || '');
    res.locals.userId = userId;

    return { req, res, continue: true };
  } catch (err) {
    console.log(err);
    res.writeHead(401, { 'Content-Type': 'application/json' });
    return { req, res, continue: false };
  }
}

module.exports = authorizationMiddleware;
