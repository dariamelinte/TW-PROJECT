const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { methods, routes, getQueryString } = require('../utils/routes');
const { getChildren, getChildById } = require('../entities/child');

async function childRouter({ url, method } = {}, res, pool) {
  console.log(pool)
  try {
    const { id, familyId } = querystring.parse(getQueryString(url));
    
    if (routes.isGetChildren(url, method)) {
      const { statusCode, data } = await getChildren(pool);

      res.writeHead(statusCode, headers);
      res.end(JSON.stringify(data));
    } else if (routes.isGetChildById(url, method, id)) {
      console.log(pool)
      const { statusCode, data } = await getChildById(pool, id);

      res.writeHead(statusCode, headers);
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(StatusCodes.NOT_FOUND, headers);
      res.end(JSON.stringify({
        success: false,
        message: 'Route not found.'
      }));
    }

    return res;
  } catch (err) {
    console.error(err);

    res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, headers);
    res.end(JSON.stringify({ message: 'Server error' }));

    return res;
  }
}

module.exports = childRouter;
