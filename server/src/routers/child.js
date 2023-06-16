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
} = require('../controllers/child');

async function childRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;
    const { id, familyId } = querystring.parse(getQueryString(url));

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.child.getAll.validate(url, method)) {
      const { statusCode, data } = await getChildren(pool);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.getById.validate(url, method, id)) {
      const { statusCode, data } = await getChildById(pool, id);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.getByFamilyId.validate(url, method, familyId)) {
      const { statusCode, data } = await getChildrenByFamilyId(pool, familyId);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.create.validate(url, method)) {
      const { statusCode, data } = await createChild(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.update.validate(url, method, id)) {
      const { statusCode, data } = await updateChild(pool, id, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.child.delete.validate(url, method, id)) {
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
