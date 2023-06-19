const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');
const {
  createMedicalEvent,
  updateMedicalEvent,
  deleteMedicalEvent,
  getMedicalEventById,
  getMedicalEventByChildId
} = require('../controllers/medicalEvent');

const { createRssFeed, rssConversionTypes } = require('../utils/rss');

async function medicalEventRouter(res, pool) {
  try {
    const { url, method, body } = res.locals;
    const { id, childId } = querystring.parse(getQueryString(url));

    let resStatusCode = StatusCodes.NOT_FOUND;
    let resData = {
      success: false,
      message: 'Route not found.'
    };

    if (routes.medical.getByChildId.validate(url, method, childId)) {
      const { statusCode, data } = await getMedicalEventByChildId(pool, childId);

      resStatusCode = statusCode;
      resData = data;
      // RSS
    } else if (routes.medical.getByChildId_RSS.validate(url, method, childId)) {
      const { statusCode, data } = await getMedicalEventByChildId(pool, childId);
      const rssFeed = createRssFeed(data, rssConversionTypes.medical.getByChildId);

      resStatusCode = statusCode;
      resData = rssFeed;
    } else if (routes.medical.getById.validate(url, method, id)) {
      const { statusCode, data } = await getMedicalEventById(pool, id);

      resStatusCode = statusCode;
      resData = data;
      // RSS
    } else if (routes.medical.getById_RSS.validate(url, method, id)) {
      const { statusCode, data } = await getMedicalEventById(pool, id);
      const rssFeed = createRssFeed(data, rssConversionTypes.medical.getById);

      resStatusCode = statusCode;
      resData = rssFeed;
    } else if (routes.medical.create.validate(url, method, id)) {
      const { statusCode, data } = await createMedicalEvent(pool, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.medical.update.validate(url, method, id)) {
      const { statusCode, data } = await updateMedicalEvent(pool, id, body);

      resStatusCode = statusCode;
      resData = data;
    } else if (routes.medical.delete.validate(url, method, id)) {
      const { statusCode, data } = await deleteMedicalEvent(pool, id);

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

module.exports = medicalEventRouter;
