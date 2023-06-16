const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');
const {
  getChildren,
  getChildById,
  getChildrenByFamilyId,
  createChild,
  updateChild,
  deleteChild,
} = require('../entities/child');

async function childRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;
    const { id, familyId } = querystring.parse(getQueryString(url));

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.child.getChildren.validate(url, method)) {
      const { statusCode, data } = await getChildren(pool);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.getChildById.validate(url, method, id)) {
      const { statusCode, data } = await getChildById(pool, id);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.getChildrenByFamilyId.validate(url, method, familyId)) {
      const { statusCode, data } = await getChildrenByFamilyId(pool, familyId);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.createChild.validate(url, method)) {
      const { statusCode, data } = await createChild(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.updateChild.validate(url, method)) {
      const { statusCode, data } = await updateChild(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.deleteChild.validate(url, method, id)) {
      const { statusCode, data } = await deleteChild(pool, id);

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

module.exports = childRouter;
