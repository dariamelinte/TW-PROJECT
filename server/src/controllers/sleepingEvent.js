const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const sleepingEventEntity = require('../entities/sleepingEvent');

exports.createSleepingEvent = async (pool, sleepingEvent = {}) => {
  try {
    const id = randomUUID();
    const { success: successCreate } = await sleepingEventEntity.insert(pool, id, sleepingEvent);
    const { success, result } = await sleepingEventEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created sleeping event successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new sleeping event.',
        error
      }
    };
  }
};

exports.updateSleepingEvent = async (pool, id, sleepingEvent = {}) => {
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

    const { result: oldSleepingEvent } = await sleepingEventEntity.getById(pool, id);
    const { success: successUpdate } = await sleepingEventEntity.update(pool, id, {
      date: sleepingEvent.date || oldSleepingEvent.date,
      start_time: sleepingEvent.start_time || oldSleepingEvent.start_time,
      end_time: sleepingEvent.end_time || oldSleepingEvent.end_time,
      sleepType: sleepingEvent.sleepType || oldSleepingEvent.sleepType,
      note: sleepingEvent.note || oldSleepingEvent.note
    });

    const { success, result } = await sleepingEventEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated sleeping event successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update sleeping event.',
        error
      }
    };
  }
};

exports.getSleepingEvents = async (pool, childId) => {
  try {
    const { success, result } = await sleepingEventEntity.getByChildId(pool, childId);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Sleeping calendar found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Sleeping calendar not found.',
        error: String(error)
      }
    };
  }
};

exports.getSleepingEventById = async (pool, id) => {
  try {
    const { success, result } = await sleepingEventEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Sleeping event found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Sleeping event not found.',
        error: String(error)
      }
    };
  }
};

exports.deleteSleepingEvent = async (pool, id) => {
  try {
    await sleepingEventEntity.delete(pool, id);
    const { result } = await sleepingEventEntity.getById(pool, id);

    if (result) {
      throw Error(`Could not properly delete sleeping event with id = ${id}`);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted sleeping event successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete sleeping event.',
        error
      }
    };
  }
};
