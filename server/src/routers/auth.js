const { StatusCodes } = require('http-status-codes');

const { headers } = require('../utils/headers');
const { routes } = require('../utils/routes');
const { register, login } = require('../controllers/auth');

async function authRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.auth.register.validate(url, method)) {
      const { statusCode, data } = await register(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.auth.login.validate(url, method)) {
      const { statusCode, data } = await login(pool, body);
      resStatusCode = statusCode;
      resData = data;
    }

    res.writeHead(resStatusCode, headers);
    res.end(JSON.stringify(resData));

    return res;
  } catch (err) {
    console.error(err);

    res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, headers);
    res.end(JSON.stringify({ message: 'Server error' }));

    return res;
  }
}

module.exports = authRouter;
