const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');
const {
  createMultimedia,
  updateMultimedia,
  deleteMultimedia,
  getMultimediaByChildId,
  getMultimediaById
} = require('../controllers/multimediaResource');

async function multimediaRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;
    const { id, childId } = querystring.parse(getQueryString(url));

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.multimedia.getByChildId.validate(url, method, childId)) {
      const { statusCode, data } = await getMultimediaByChildId(pool, childId);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.multimedia.getById.validate(url, method, id)) {
      const { statusCode, data } = await getMultimediaById(pool, id);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.multimedia.create.validate(url, method, id)) {
      const { statusCode, data } = await createMultimedia(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.multimedia.update.validate(url, method, id)) {
      const { statusCode, data } = await updateMultimedia(pool, id, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.multimedia.delete.validate(url, method, id)) {
      const { statusCode, data } = await deleteMultimedia(pool, id);

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

module.exports = multimediaRouter;
