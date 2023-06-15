const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

exports.createFriend = async (pool, friend = {}) => {
  try {
    const {
      childId,
      firstName,
      lastName,
      dateOfBirth,
      parentName,
      parentContact,
      howTheyMet,
      relationship
    } = friend;
    const id = randomUUID();

    await pool.query(
      `
      INSERT INTO friend
        (id, "childId", "firstName", "lastName", "dateOfBirth", "parentName", "parentContact", "howTheyMet", relationship)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        id,
        childId,
        firstName,
        lastName,
        dateOfBirth,
        parentName,
        parentContact,
        howTheyMet,
        relationship
      ]
    );

    const result = await pool.query(`SELECT * FROM friend WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success: true,
        message: 'Created friend successfuly.',
        result: result?.rows?.[0]
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

exports.updateFriend = async (pool, friendId, friend = {}) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      parentName,
      parentContact,
      howTheyMet,
      relationship
    } = friend;

    if (!friendId) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: friendId',
        }
      };
    }

    const resSelect = await pool.query(`SELECT * FROM friend WHERE id = $1`, [friendId]);
    const {
      firstName: oldFirstName,
      lastName: oldLastName,
      dateOfBirth: oldDOB,
      parentName: oldParentName,
      parentContact: oldParentContact,
      howTheyMet: oldHowTheyMet,
      relationship: oldRelationship
    } = resSelect?.rows?.[0];


    await pool.query(
      `UPDATE friend SET "firstName" = $1, "lastName" = $2, "dateOfBirth" = $3, "parentName" = $4,
        "parentContact" = $5, "howTheyMet" = $6, relationship = $7 WHERE id = $8`,
      [
        firstName || oldFirstName,
        lastName || oldLastName,
        dateOfBirth || oldDOB,
        parentName || oldParentName,
        parentContact || oldParentContact,
        howTheyMet || oldHowTheyMet,
        relationship || oldRelationship,
        friendId
      ]
    );

    const result = await pool.query(`SELECT * FROM friend WHERE id = $1`, [friendId]);
    
    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated friend successfuly.',
        result: result?.rows?.[0],
      }
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not update friend.',
      error
    };
  }
};

exports.deleteFriend = async (pool, id) => {
  try {
    await pool.query(`DELETE FROM friend WHERE id = $1`, [id]);

    const result = await pool.query(`SELECT * FROM friend WHERE id = $1`, [id]);

    if (result?.rows?.length) {
      throw Error(`Could not properly delete friend with id = ${id}`);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted friend successfuly.',
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
    const result = await pool.query(`SELECT * FROM friend WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows?.[0],
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
    const result = await pool.query(`SELECT * FROM friend WHERE "childId" = $1`, [childId]);
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows,
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
