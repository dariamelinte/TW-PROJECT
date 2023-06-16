const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const friendInteractionEntity = require('../entities/friendInteraction');

exports.createFriendInteraction = async (pool, friendInteraction = {}) => {
  try {
    const id = randomUUID();
  
    const { success: successCreate } = await friendInteractionEntity.insert(pool, id, friendInteraction);
    const { success, result } = await friendInteractionEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created friend interaction successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new friend interaction.',
        error
      }
    };
  }
};

exports.updateFriendInteraction = async (pool, id, friendInteraction = {}) => {
  try {
    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: id',
        }
      };
    }

    const { result: old } = await friendInteractionEntity.getById(pool, id);
    const { success: successUpdate } = await friendInteractionEntity.update(pool, id, {
      date: friendInteraction.date || old.date,
      title: friendInteraction.title || old.title,
      note: friendInteraction.note || old.note
    });

    const { success, result } = await friendInteractionEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated friend interaction successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update friend interaction.',
        error
      }
    };
  }
};

exports.deleteFriendInteraction = async (pool, id) => {
  try {
    await friendInteractionEntity.delete(pool, id);
    const { result } = await friendInteractionEntity.getById(pool, id);

    if (result) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted friend interaction successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete friend interaction.',
        error
      }
    };
  }
};

exports.getFriendInteractionById = async (pool, id) => {
  try {
    const { success, result } = await friendInteractionEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Friend interaction found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Friend interaction not found.',
        error: String(error)
      }
    };
  }
};

exports.getFriendInteractionByChildId = async (pool, childId, friendId) => {
  try {
    const { success, result } = await friendInteractionEntity.getByChildId(pool, childId, friendId);

    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Friend interactions found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Friend interactions not found.',
        error: String(error)
      }
    };
  }
};
