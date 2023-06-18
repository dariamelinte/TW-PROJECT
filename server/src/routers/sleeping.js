const { StatusCodes } = require('http-status-codes');
const querystring = require('querystring');

const { headers } = require('../utils/headers');
const { routes, getQueryString } = require('../utils/routes');

const {
    createSleepingEvent,
    updateSleepingEvent,
    getSleepingEvents,
    getSleepingEventById,
    deleteSleepingEvent
} = require('../controllers/sleepingEvent');

async function sleepingRouter(res, pool) {
    try{
        const {url, method, body} = res.locals;
        const {id, childId} = querystring.parse(getQueryString(url));

        let resStatusCode = StatusCodes.NOT_FOUND;
        let resData = {
            success: false,
            message: 'Route not found.'
        };

        if (routes.sleeping.create.validate(url, method, id)) {
            const { statusCode, data } = await createSleepingEvent(pool, body);
      
            resStatusCode = statusCode;
            resData = data;
        } else if (routes.sleeping.getAll.validate(url, method, childId)) {
            const { statusCode, data } = await getSleepingEvents(pool, childId);

            resStatusCode = statusCode;
            resData = data;
        } else if (routes.sleeping.getById.validate(url, method, id)) {
            const { statusCode, data } = await getSleepingEventById(pool, id);

            resStatusCode = statusCode;
            resData = data;
        } else if (routes.sleeping.update.validate(url, method, id)) {
            const { statusCode, data } = await updateSleepingEvent(pool, id, body);
            
            resStatusCode = statusCode;
            resData = data;
        } else if (routes.sleeping.delete.validate(url, method, id)) {
            const { statusCode, data } = await deleteSleepingEvent(pool, id);
            
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

module.exports = sleepingRouter;