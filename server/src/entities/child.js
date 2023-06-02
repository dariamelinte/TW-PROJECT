const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

exports.createChild = async (pool, child = {}) => {
  try {
    const { familyId, firstName, lastName, dateOfBirth, gender, nationality, weight, height } =
      child;
    const id = randomUUID();

    const result = await pool.query(
      `
      INSERT INTO TABLE child
        (id, familyId, firstName, lastName, dateOfBirth, gender, nationality, weight, height)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [id, familyId, firstName, lastName, dateOfBirth, gender, nationality, weight, height]
    );

    return {
      success: true,
      message: 'Created child successfuly.',
      result
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Could not create new child.',
      data: null,
      error
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
    console.log(pool)
    const result = await pool.query(
      `
      SELECT * FROM child
      WHERE
        id = $1
      `,
      [id]
    );
    console.log(result)
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
    const result = await pool.query(
      `
      SELECT * FROM child
      WHERE
        familyId = $1
      `,
      [familyId]
    );
    return {
      success: true,
      result: result?.rows,
      message: 'Children found.'
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Children not found.',
      error: String(error)
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
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Children not found.',
        error: String(error)
      }
    };
  }
};
