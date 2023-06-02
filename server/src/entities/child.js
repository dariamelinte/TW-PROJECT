const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

exports.createChild = async (pool, child = {}) => {
  try {
    const { familyId, firstName, lastName, dateOfBirth, gender, nationality, weight, height } =
      child;
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
        result: result?.rows?.[0],
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
    const result = await pool.query(
      `
      UPDATE child
      SET
        firstName = $1,
        lastName = $2,
        dateOfBirth = $3,
        gender = $4,
        nationality = $5,
        weight = $6,
        height = $7
      WHERE
        id = $8
      `,
      [firstName, lastName, dateOfBirth, gender, nationality, weight, height, id]
    );

    return {
      success: true,
      message: 'Updated child successfuly.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not update child.',
      error
    };
  }
};

exports.deleteChild = async (pool, id) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM child
      WHERE
        id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Deleted child successfuly.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not delete child.',
      error
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
    console.log(result);
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
    console.log(familyId);
    const result = await pool.query(`SELECT * FROM child where "familyId" = $1`, [familyId]);
    console.log(familyId);
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
