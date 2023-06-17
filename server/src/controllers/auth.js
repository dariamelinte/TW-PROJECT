const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const userEntity = require('../entities/user');
const { createRandomString } = require('../utils/createRandomString');
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

  try {
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

    const token = jwt.sign({ id: user.id, familyId: user.familyId }, process.env.TOKEN, {
      expiresIn: '1h'
    });

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

exports.forgotPassword = async (pool, credentials = {}) => {
  const emptyEmail = !(credentials.email && credentials.email.trim().length);
  const password = createRandomString(10);

  if (emptyEmail) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      data: {
        success: false,
        message: 'Missing field: email.'
      }
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: credentials.email,
    subject: '[BAIN] - Password reset',
    text: 'Your new password is ' + password
  };

  try {
    const { accepted } = await transporter.sendMail(mailOptions);

    if (!accepted.length) throw Error();

    const { success: succesGet, result: user } = await userEntity.getByEmail(
      pool,
      credentials.email
    );
    const { success: successUpdate } = await userEntity.updatePassword(
      pool,
      user.id,
      hashString(password)
    );

    if (!succesGet || !successUpdate) throw Error();

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Email sent to ' + accepted[0]
      }
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Something went wrong, please try again.'
      }
    };
  }
};

exports.logout = async (pool, user = {}) => {
  try {
    const data = await userEntity.getById(pool, user.id);

    if (!data.success || !data.result) {
      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        data: {
          success: false,
          message: 'User not found.'
        }
      };
    }

    const { success } = await userEntity.updateJWT(pool, user.id, null);
    const { success: successGet, result } = await userEntity.getById(pool, user.id);

    if (!success || !successGet) throw Error();

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Logout successful.',
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
