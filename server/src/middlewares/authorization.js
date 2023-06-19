const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { headers } = require('../utils/headers');

const authorizationMiddleware = (req, res) => {
  // Get the token from the authorization bearer
  const token = req.headers.authorization.replace('Bearer ', '')

  // If there is no token, return a 401
  if (!token) {
    res.writeHead(StatusCodes.UNAUTHORIZED, headers);
    res.end(JSON.stringify({ message: 'Unauthorized' }));
    return { req, res, continue: false };
  }

  // Verify the token
  try {
    const { id, familyId } = jwt.verify(token, process.env.TOKEN || '');
    console.log(id, familyId);
    res.locals.userId = id;
    res.locals.familyId = familyId;

    return { req, res, continue: true };
  } catch (err) {
    console.log(err);
    res.writeHead(StatusCodes.UNAUTHORIZED, headers);
    return { req, res, continue: false };
  }
}

module.exports = authorizationMiddleware;
