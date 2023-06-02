const { StatusCodes } = require('http-status-codes');
const { headers } = require("../utils/headers");

async function authRouter (res, pool) {
  try {
    // TODO: Implement auth router

    res.writeHead(StatusCodes.OK, headers);
    res.end(JSON.stringify({ message: 'Hello from auth' }));
    
    return res;
  } catch (err) {
    console.error(err);

    res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, headers);
    res.end(JSON.stringify({ message: 'Server error' }));
    
    return res;
  }
}

module.exports = authRouter;