const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');
const {
  getUserByEmail,
  getUserById,
  getUsersByFamilyId,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');

async function userRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;
    const { id, email, familyId } = querystring.parse(getQueryString(url));

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.user.getByEmail.validate(url, method)) {
      const { statusCode, data } = await getUserByEmail(pool, email);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.user.getById.validate(url, method, id)) {
      const { statusCode, data } = await getUserById(pool, id);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.user.getByFamilyId.validate(url, method, familyId)) {
      const { statusCode, data } = await getUsersByFamilyId(pool, familyId);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.user.create.validate(url, method)) {
      const { statusCode, data } = await createUser(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.user.update.validate(url, method, id)) {
      const { statusCode, data } = await updateUser(pool, id, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.user.delete.validate(url, method, id)) {
      const { statusCode, data } = await deleteUser(pool, id);

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

module.exports = userRouter;
