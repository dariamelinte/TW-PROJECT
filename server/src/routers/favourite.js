const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');

const {
    addFavourite,
    deleteFavourite,
    getFavouritesByUserId,
    getFavouriteByElementId,
    getFavouriteById
} = require('../controllers/favourite');

async function favouriteRouter(res, pool) {
    try{
        const {url, method, body} = res.locals;
        const {id, userId, elementId} = querystring.parse(getQueryString(url));

        let resStatusCode = StatusCodes.NOT_FOUND;
        let resData = {
            success: false,
            message: 'Route not found.'
        };

        if (routes.favourite.add.validate(url, method)) {
            const { statusCode, data } = await addFavourite(pool, body);
      
            resStatusCode = statusCode;
            resData = data;
        } else if (routes.favourite.getByUserId.validate(url, method, userId)) {
            const { statusCode, data } = await getFavouritesByUserId(pool, userId);

            resStatusCode = statusCode;
            resData = data;
        } else if (routes.favourite.getById.validate(url, method, id)) {
            const { statusCode, data } = await getFavouriteById(pool, id);

            resStatusCode = statusCode;
            resData = data;
        } else if (routes.favourite.getByElementId.validate(url, method, elementId)) {
            const { statusCode, data } = await getFavouriteByElementId(pool, elementId);
            
            resStatusCode = statusCode;
            resData = data;
        } else if (routes.favourite.delete.validate(url, method, id)) {
            const { statusCode, data } = await deleteFavourite(pool, id);
            
            resStatusCode = statusCode;
            resData = data;
        }

        res.writeHead(resStatusCode, headers);
        res.end(JSON.stringify(resData));

        return res;
    }
    catch (err){
        console.error(err);

        res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, headers);
        res.end(JSON.stringify({ message: 'Server error' }));

        return res;
    }
}

module.exports = favouriteRouter;