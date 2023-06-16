import { randomUUID } from 'crypto';
const { StatusCodes } = require('http-status-codes');

const feedingEventEntity = require('../entities/feedingEvent');

exports.createFeedingEvent = async (pool, feedingEvent = {}) => {
  try {
    const id = randomUUID();
    const {succes: successCreate } = await feedingEventEntity.insert(pool, id, feedingEvent);
    const { success, result } = await feedingEventEntity.getById(pool, id);

    //const { childId, dateTime, note } = feedingEvent;

    // const result = await pool.query(
    //   `
    //   INSERT INTO  feeding_calendar
    //     (id, childId, dateTime, note)
    //   VALUES
    //     ($1, $2, $3, $4)
    //   `,
    //   [randomUUID(), childId, dateTime, note]
    // );

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created feeding event successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new feeding event.',
        error
      }
    };
  }
};

exports.updateFeedingEvent = async (pool, id, feedingEvent = {}) => {
  try {
    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: friendId'
        }
      };
    }

    const { result: oldFeedingEvent } = await feedingEventEntity.getById(pool, id);
    const { success: successUpdate } = await feedingEventEntity.update(pool, id, {
      date_time: feedingEvent.date_time || oldFeedingEvent.date_time,
      note: feedingEvent.note || oldFeedingEvent.note
    });

    const { success, result: updateFeedingEvent } = await feedingEventEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }
    // const { id, childId, dateTime, note } = feedingEvent;
    // const result = await pool.query(
    //   `
    //   UPDATE feeding_calendar
    //   SET
    //     childId = $1,
    //     dateTime = $2,
    //     note = $3
    //   WHERE id = $4
    //   `,
    //   [childId, dateTime, note, id]
    // );

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated feeding event successfuly.',
        result: updatedFriend
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update feeding event.',
        error
      }
    };
  }
};

exports.getFeedingEvents = async (childId, pool) => {
  try {
    const { success, result } = await feedingEventEntity.getByChildId(pool, childId);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Feeding calendar found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Feeding calendar not found.',
        error: String(error)
      }
    };
  }
};

exports.getFeedingEventById = async (pool, id) => {
  try {
    const { success, result } = await friendEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Feeding event found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Feeding event not found.',
        error: String(error)
      }
    };
  }
};

exports.deleteFeedingEvent = async (id, pool) => {
  try {
    await feedingEventEntity.delete(pool, id);
    const { result } = await feedingEventEntity.getById(pool, id);

    if (result) {
      throw Error(`Could not properly delete feeding event with id = ${id}`);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted feeding event successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete feeding event.',
        error
      }
    };
  }
};
