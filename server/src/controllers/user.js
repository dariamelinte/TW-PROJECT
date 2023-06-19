const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const userEntity = require('../entities/user');

exports.createUser = async (pool, user = {}) => {
  try {
    const id = randomUUID();
    const { result: existentUser } = await userEntity.getUserByEmail(pool, user.email);

    if (Object.keys(existentUser).length) {
      return {
        statusCode: StatusCodes.CONFLICT,
        data: {
          success: false,
          message: 'User already exists.',
          result: null
        }
      }
    }

    const { success: successCreate } = await userEntity.insert(pool, id, user);
    const { success, result } = await userEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created user successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new user.',
        error
      }
    };
  }
};

exports.updateUser = async (pool, id, user = {}, authId) => {
  try {
    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: id'
        }
      };
    }

    if (id !== authId) throw Error();

    const { result: oldUser } = await userEntity.getById(pool, id);
    const { success: successUpdate } = await userEntity.update(pool, id, {
      firstName: user.firstName || oldUser.firstName,
      lastName: user.lastName || oldUser.lastName,
      dateOfBirth: user.dateOfBirth || oldUser.dateOfBirth,
      gender: user.gender || oldUser.gender,
      nationality: user.nationality || oldUser.nationality,
      familyId: user.familyId || oldUser.familyId
    });

    const { success, result } = await userEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated user successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update user.',
        error
      }
    };
  }
};

exports.deleteUser = async (pool, id, authId) => {
  try {
    if (id !== authId) throw Error();

    await userEntity.delete(pool, id);
    const { result } = await userEntity.getById(pool, id);

    if (result) {
      throw Error(`Could not properly delete user with id = ${id}`);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted user successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete user.',
        error
      }
    };
  }
};

exports.getUserById = async (pool, id, authId) => {
  try {
    if (id !== authId) throw Error();

    const { success, result } = await userEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'User found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'User not found.',
        error: String(error)
      }
    };
  }
};

exports.getUsersByFamilyId = async (pool, familyId, authFamilyId) => {
  try {
    if (authFamilyId !== familyId) throw Error();

    const { success, result } = await userEntity.getByFamilyId(pool, familyId);

    if (!success) throw Error();

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Users found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Users not found.',
        error: String(error)
      }
    };
  }
};

exports.getUserByEmail = async (pool, email, authId) => {
  try {
    const { success, result } = await userEntity.getByEmail(pool, email);

    if (!success || result.id !== authId) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'User found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'User not found.',
        error: String(error)
      }
    };
  }
};
