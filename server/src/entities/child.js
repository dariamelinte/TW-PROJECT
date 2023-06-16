const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

exports.createChild = async (pool, child = {}) => {
  try {
    const {
      familyId,
      firstName,
      lastName,
      dateOfBirth,
      gender = null,
      nationality = null,
      weight = null,
      height = null
    } = child;
    const id = randomUUID();

    await pool.query(
      `
      INSERT INTO child
        (id, "familyId", "firstName", "lastName", "dateOfBirth", gender, nationality, weight, height)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [id, familyId, firstName, lastName, dateOfBirth, gender, nationality, weight, height]
    );

    const result = await pool.query(`SELECT * FROM child WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success: true,
        message: 'Created child successfuly.',
        result: result?.rows?.[0]
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new child.',
        error
      }
    };
  }
};

exports.updateChild = async (pool, child = {}) => {
  try {
    const { id, firstName, lastName, dateOfBirth, gender, nationality, weight, height } = child;

    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: id'
        }
      };
    }

    const resSelect = await pool.query(`SELECT * FROM child WHERE id = $1`, [id]);
    const {
      firstName: oldFirstName,
      lastName: oldLastName,
      dateOfBirth: oldDOB,
      gender: oldGender,
      nationality: oldNat,
      weight: oldW,
      height: oldH
    } = resSelect?.rows?.[0];

    await pool.query(
      `UPDATE child SET "firstName" = $1, "lastName" = $2, "dateOfBirth" = $3, gender = $4,
        nationality = $5, weight = $6, height = $7 WHERE id = $8`,
      [
        firstName || oldFirstName,
        lastName || oldLastName,
        dateOfBirth || oldDOB,
        gender || oldGender,
        nationality || oldNat,
        weight || oldW,
        height || oldH,
        id
      ]
    );

    const result = await pool.query(`SELECT * FROM child WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated child successfuly.',
        result: result?.rows?.[0],
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update child.',
        error
      }
    };
  }
};

exports.deleteChild = async (pool, id) => {
  try {
    await pool.query(`DELETE FROM child WHERE id = $1`, [id]);

    const result = await pool.query(`SELECT * FROM child WHERE id = $1`, [id]);

    if (result?.rows?.length) {
      throw Error(`Could not properly delete child with id = ${id}`);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted child successfuly.',
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete child.',
        error
      }
    };
  }
};

exports.getChildById = async (pool, id) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM child
      WHERE
        id = $1
      `,
      [id]
    );
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows?.[0],
        message: 'Child found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Child not found.',
        error: String(error)
      }
    };
  }
};

exports.getChildrenByFamilyId = async (pool, familyId) => {
  try {
    const result = await pool.query(`SELECT * FROM child where "familyId" = $1`, [familyId]);

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows,
        message: 'Children found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Children not found.',
        error: String(error)
      }
    };
  }
};

exports.getChildren = async (pool) => {
  try {
    const result = await pool.query(`SELECT * FROM child`);
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows,
        message: 'Children found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Children not found.',
        error: String(error)
      }
    };
  }
};
