import { randomUUID } from 'crypto';

exports.createFeedingEvent = async (feedingEvent, pool) => {
  try {
    const { childId, dateTime, note } = feedingEvent;

    const result = await pool.query(
      `
      INSERT INTO TABLE feeding_calendar
        (id, childId, dateTime, note)
      VALUES
        ($1, $2, $3, $4)
      `,
      [randomUUID(), childId, dateTime, note]
    );
    return {
      success: true,
      message: 'Saved feeding event successfuly.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not save feeding event.',
      error
    };
  }
};

exports.updateFeedingEvent = async (feedingEvent, pool) => {
  try {
    const { id, childId, dateTime, note } = feedingEvent;
    const result = await pool.query(
      `
      UPDATE feeding_calendar
      SET
        childId = $1,
        dateTime = $2,
        note = $3
      WHERE id = $4
      `,
      [childId, dateTime, note, id]
    );
    return {
      success: true,
      message: 'Updated feeding event successfuly.',
      result
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

exports.getFeedingEvent = async (childId, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM feeding_calendar
      WHERE childId = $1
      `,
      [childId]
    );
    return {
      success: true,
      message: 'Feeding calendar found.',
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Feeding calendar not found.',
      error
    };
  }
};

exports.deleteFeedingEvent = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM feeding_calendar
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Deleted feeding calendar successfuly.',
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not delete feeding calendar.',
      error
    };
  }
};
