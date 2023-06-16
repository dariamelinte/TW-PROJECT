const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');
const {
  createFriendInteraction,
  updateFriendInteraction,
  deleteFriendInteraction,
  getFriendInteractionById,
  getFriendInteractionByChildId
} = require('../controllers/friendInteraction');

async function friendInteractionRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;
    const { id, childId, friendId } = querystring.parse(getQueryString(url));

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.friendInteraction.getByChildId.validate(url, method, childId, friendId)) {
      const { statusCode, data } = await getFriendInteractionByChildId(pool, childId, friendId);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friendInteraction.getById.validate(url, method, id)) {
      const { statusCode, data } = await getFriendInteractionById(pool, id);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friendInteraction.create.validate(url, method, id)) {
      const { statusCode, data } = await createFriendInteraction(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friendInteraction.update.validate(url, method, id)) {
      const { statusCode, data } = await updateFriendInteraction(pool, id, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.friendInteraction.delete.validate(url, method, id)) {
      const { statusCode, data } = await deleteFriendInteraction(pool, id);

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

module.exports = friendInteractionRouter;
