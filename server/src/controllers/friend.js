const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const friendEntity = require('../entities/friend');

exports.createFriend = async (pool, friend = {}) => {
  try {
    const id = randomUUID();
    const { success: successCreate } = await friendEntity.insert(pool, id, friend);
    const { success, result } = await friendEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created friend successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new friend.',
        error
      }
    };
  }
};

exports.updateFriend = async (pool, id, friend = {}) => {
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

    const { result: oldFriend } = await friendEntity.getById(pool, id);
    const { success: successUpdate } = await friendEntity.update(pool, id, {
      firstName: friend.firstName || oldFriend.firstName,
      lastName: friend.lastName || oldFriend.lastName,
      dateOfBirth: friend.dateOfBirth || oldFriend.dateOfBirth,
      parentName: friend.parentName || oldFriend.parentName,
      parentContact: friend.parentContact || oldFriend.parentContact,
      howTheyMet: friend.howTheyMet || oldFriend.howTheyMet,
      relationship: friend.relationship || oldFriend.relationship
    });

    const { success, result: updatedFriend } = await friendEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated friend successfuly.',
        result: updatedFriend
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update friend.',
        error
      }
    };
  }
};

exports.deleteFriend = async (pool, id) => {
  try {
    await friendEntity.delete(pool, id);
    const { result } = await friendEntity.getById(pool, id);

    if (result) {
      throw Error(`Could not properly delete friend with id = ${id}`);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted friend successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete friend.',
        error
      }
    };
  }
};

exports.getFriendById = async (pool, id) => {
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
        message: 'Friend found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Friend not found.',
        error: String(error)
      }
    };
  }
};

exports.getAllFriends = async (pool, childId) => {
  try {
    const { success, result } = await friendEntity.getByChildId(pool, childId);

    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Friends found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Friends not found.',
        error: String(error)
      }
    };
  }
};
