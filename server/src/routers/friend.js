const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');
const {
  createFriend,
  updateFriend,
  deleteFriend,
  getFriendById,
  getAllFriends
} = require('../controllers/friend');

async function friendRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;
    const { id, childId } = querystring.parse(getQueryString(url));

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.friend.getAll.validate(url, method, childId)) {
      const { statusCode, data } = await getAllFriends(pool, childId);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friend.getById.validate(url, method, id)) {
      const { statusCode, data } = await getFriendById(pool, id);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friend.create.validate(url, method, id)) {
      const { statusCode, data } = await createFriend(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friend.update.validate(url, method, id)) {
      const { statusCode, data } = await updateFriend(pool, id, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friend.delete.validate(url, method, id)) {
      const { statusCode, data } = await deleteFriend(pool, id);

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

module.exports = friendRouter;
