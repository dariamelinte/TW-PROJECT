const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const userEntity = require('../entities/user');
const { hashString, isHashMatching } = require('../utils/hash');

exports.register = async (pool, user = {}) => {
  try {
    const id = randomUUID();

    if (!user.email || !user.password) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Missing fields: email, password.',
          result: null
        }
      };
    }

    const { result: existentUser } = await userEntity.getByEmail(pool, user.email);

    if (existentUser && Object.keys(existentUser).length) {
      return {
        statusCode: StatusCodes.CONFLICT,
        data: {
          success: false,
          message: 'User already exists.',
          result: null
        }
      };
    }

    user.password = hashString(user.password);

    const { success: successCreate } = await userEntity.insert(pool, id, user);
    const { success, result } = await userEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Registered successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not register.',
        error
      }
    };
  }
};

exports.login = async (pool, credentials = {}) => {
  try {
    const emptyEmail = !(credentials.email && credentials.email.trim().length);
    const emptyPassword = !(credentials.password && credentials.password.trim().length);

    if (emptyEmail || emptyPassword) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Missing fields: email, password.'
        }
      };
    }

    const { result: user } = await userEntity.getByEmail(pool, credentials.email);

    if (!user || !isHashMatching(credentials.password, user.password)) {
      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        data: {
          success: false,
          message: 'User not found. The email or the password are incorrect.'
        }
      };
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN, { expiresIn: '1h' });

    const { success } = await userEntity.updateJWT(pool, user.id, token);
    const { success: successGet, result } = await userEntity.getByEmail(pool, user.email);

    if (!success || !successGet) throw Error();

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Login successful.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not login.',
        error
      }
    };
  }
};
