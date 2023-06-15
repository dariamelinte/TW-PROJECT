const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

exports.createFriendInteraction = async (pool, friendInteraction = {}) => {
  try {
    const { friendId, date, title, note } = friendInteraction;
    const id = randomUUID();
  
    await pool.query(
      `INSERT INTO  friend_interaction (id, "friendId", date, title, note) 
        VALUES ($1, $2, $3, $4, $5)`,
      [id, friendId, date, title, note]
    );

    const result = await pool.query(`SELECT * FROM friend_interaction WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success: true,
        message: 'Created friend interaction successfuly.',
        result: result?.rows?.[0]
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
    const { date, title, note } = friendInteraction;

    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: id',
        }
      };
    }

    const resSelect = await pool.query(`SELECT * FROM friend_interaction WHERE id = $1`, [id]);
    const {
      date: oldDate,
      title: oldTitle,
      note: oldNote,
    } = resSelect?.rows?.[0];


    await pool.query(
      `UPDATE friend_interaction SET date = $1, title = $2, note = $3 WHERE id = $4`,
      [
        date || oldDate,
        title || oldTitle,
        note || oldNote,
        id
      ]
    );

    const result = await pool.query(`SELECT * FROM friend_interaction WHERE id = $1`, [id]);
    
    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated friend interaction successfuly.',
        result: result?.rows?.[0],
      }
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not update friend interaction.',
      error
    };
  }
};

exports.deleteFriendInteraction = async (pool, id) => {
  try {
    await pool.query(`DELETE FROM friend_interaction WHERE id = $1`, [id]);

    const result = await pool.query(`SELECT * FROM friend_interaction WHERE id = $1`, [id]);

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

exports.getFriendInteractionById = async (pool, id) => {
  try {
    const result = await pool.query(`SELECT * FROM friend_interaction WHERE id = $1`, [id]);

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows?.[0],
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
    const result = await pool.query(
      `
        SELECT
          fi.id as "id",
          fi.date as "date",
          fi.title as "title",
          fi.note as "note"
        FROM friend_interaction fi JOIN friend f
        ON fi."friendId" = f.id
        WHERE f."childId" = $1 AND fi."friendId" = $2
        ORDER BY fi.date DESC;
      `,
      [childId, friendId]
    );
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result: result?.rows,
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
