    const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');

const {
    createFeedingEvent,
    updateFeedingEvent,
    getFeedingEvents,
    getFeedingEventById,
    deleteFeedingEvent
} = require('../controllers/feedingEvent');

const { createRssFeed, rssConversionTypes } = require('../utils/rss');


async function feedingRouter(res, pool) {
    try{
        const {url, method, body} = res.locals;
        const {id, childId} = querystring.parse(getQueryString(url));

        let resStatusCode = StatusCodes.NOT_FOUND;
        let resData = {
            success: false,
            message: 'Route not found.'
        };

        if (routes.feeding.create.validate(url, method, id)) {
            const { statusCode, data } = await createFeedingEvent(pool, body);
            
            resStatusCode = statusCode;
            resData = data;
        } else if (routes.feeding.getAll.validate(url, method, childId)) {
            const { statusCode, data } = await getFeedingEvents(pool, childId);

            resStatusCode = statusCode;
            resData = data;
        // RSS
        } else if (routes.feeding.getAll_RSS.validate(url, method, childId)) {
            const { statusCode, data } = await getFeedingEvents(pool, childId);
            const rssFeed = createRssFeed(data, rssConversionTypes.feeding.getAll);

            resStatusCode = statusCode;
            resData = rssFeed;
        } else if (routes.feeding.getById.validate(url, method, id)) {
            const { statusCode, data } = await getFeedingEventById(pool, id);

            resStatusCode = statusCode;
            resData = data;
        // RSS
        } else if (routes.feeding.getById_RSS.validate(url, method, id)) {
            const { statusCode, data } = await getFeedingEventById(pool, id);
            const rssFeed = createRssFeed(data, rssConversionTypes.feeding.getById);

            resStatusCode = statusCode;
            resData = rssFeed;
        } else if (routes.feeding.update.validate(url, method, id)) {
            const { statusCode, data } = await updateFeedingEvent(pool, id, body);
            
            resStatusCode = statusCode;
            resData = data;
        } else if (routes.feeding.delete.validate(url, method, id)) {
            const { statusCode, data } = await deleteFeedingEvent(pool, id);
            
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

module.exports = feedingRouter;