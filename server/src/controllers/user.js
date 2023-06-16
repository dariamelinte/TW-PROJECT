const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const { getChildrenByFamilyId, deleteChild } = require('./child');

exports.createUser = async (pool, user = {}) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, gender, nationality } = user;
    const id = randomUUID();

    const userWithEmail = await getUserByEmail(pool, email);

    if (Object.keys(userWithEmail.result).length) {
      return {
        statusCode: StatusCodes.CONFLICT,
        data: {
          success: false,
          message: 'User already exists.',
          result: null
        }
      }
    }

    await pool.query(
      `
      INSERT INTO  user 
        (id, email, password, "firstName", "lastName", "dateOfBirth", gender, nationality, "familyId")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        id,
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        nationality,
        randomUUID()
      ]
    );

    const result = await pool.query(`SELECT * FROM user WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success: true,
        message: 'Created user successfuly.',
        result: result?.rows?.[0]
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

exports.updateUser = async (pool, id, user = {}) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, nationality, familyId } = user;
    
    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: id'
        }
      };
    }

    const resSelect = await pool.query(`SELECT * FROM user WHERE id = $1`, [id]);
    const {
      firstName: oldFirstName,
      lastName: oldLastName,
      dateOfBirth: oldDOB,
      gender: oldGender,
      nationality: oldNat,
      familyId: oldFamilyId
    } = resSelect?.rows?.[0];
   
   
    await pool.query(
      `UPDATE user SET firstName = $1, lastName = $2, dateOfBirth = $3, 
        gender = $4, nationality = $5, familyId = $6 WHERE id = $7`,
      [
        firstName || oldFirstName,
        lastName || oldLastName,
        dateOfBirth || oldDOB,
        gender || oldGender,
        nationality || oldNat,
        familyId || oldFamilyId,
        id
      ]
    );

    const result = await pool.query(`SELECT * FROM user WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated user successfuly.',
        result: result?.rows?.[0],
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

exports.deleteUser = async (pool, id) => {
  try {
    const { data: { result: user } } = await this.getUserById(pool, id);

    await pool.query(`DELETE FROM user WHERE id = $1`, [id]);

    const { data: { result: userAfter } } = await this.getUserById(pool, id);
    
    if (userAfter?.length) {
      throw Error(`Could not properly delete user with id = ${id}`);
    }
  
    const { data: { result: users }} = await this.getUserByFamilyId(pool, user.familyId);
     
    if (users?.length) {
      return {
        statusCode: StatusCodes.OK,
        data: {
          success: true,
          message: 'Deleted user successfuly.',
        }
      };
    }

    const { data: { result: children }} = await getChildrenByFamilyId(pool, user.familyId);
   
    for (const child in children) {
      await deleteChild(pool, child.id);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted user and children successfuly.',
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

exports.getUserById = async (pool, id) => {
  try {
    const result = await pool.query(`SELECT * FROM user WHERE id = $1`, [id]);
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows?.[0],
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
        error
      }
    };
  }
};

exports.getUserByFamilyId = async (pool, familyId) => {
  try {
    const result = await pool.query(
      `SELECT * FROM user WHERE "familyId" = $1`,
      [familyId]
    );
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows,
        message: 'Users found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Users not found.',
        error
      }
    };
  }
};

exports.getUserByEmail = async (pool, email) => {
  try {
    const result = await pool.query(
      `SELECT * FROM user WHERE email = $1`,
      [email]
    );
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows?.[0],
        message: 'User found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'User not found.',
        error
      }
    };
  }
};
