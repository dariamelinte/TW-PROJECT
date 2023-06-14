import { randomUUID } from 'crypto';

exports.saveFriendInteractionEvent = async (friendInteractionEvent = {}, pool) => {
  try {
    const { childId, friendId, date, title, note } = friendInteractionEvent;
    const result = await pool.query(
      `
      INSERT INTO  friend_interactions
        (id, childId, friendId, date, title, note)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      `,
      [randomUUID(), childId, friendId, date, title, note]
    );
    return {
      success: true,
      message: 'Saved friend interaction event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not save friend interaction event.',
      error
    };
  }
};

exports.updateFriendInteractionEvent = async (friendInteractionEvent = {}, pool) => {
  try {
    const { childId, friendId, date, title, note, id } = friendInteractionEvent;
    const result = await pool.query(
      `
      UPDATE friend_interactions
      SET
        childId = $1,
        friendId = $2,
        date = $3,
        title = $4,
        note = $5
      WHERE id = $6
      `,
      [childId, friendId, date, title, note, id]
    );

    return {
      success: true,
      message: 'Updated friend interaction event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not update friend interaction event.',
      error
    };
  }
};

exports.deleteFriendInteractionEvent = async (id, pool) => {
  try {
    await pool.query(
      `
        DELETE FROM friend_interactions
        WHERE id = $1
        `,
      [id]
    );

    return {
      success: true,
      message: 'Deleted friend interaction event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not delete friend interaction event.',
      error
    };
  }
};

exports.findFriendInteractionEventById = async (id, pool) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM friend_interactions
        WHERE id = $1
        `,
      [id]
    );
    return {
      success: true,
      message: 'Found friend interaction event.',
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find friend interaction event.',
      error
    };
  }
};

exports.findFriendInteractionEventByChildId = async (childId, pool) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM friend_interactions
        WHERE childId = $1
        `,
      [childId]
    );
    return {
      success: true,
      message: 'Found friend interaction events.',
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find friend interaction events.',
      error
    };
  }
};
