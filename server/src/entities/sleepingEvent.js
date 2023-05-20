import { randomUUID } from 'crypto';

export const saveSleepingEvent = async (sleepingEvent, pool) => {
  try {
    const { childId, dateTime, sleepType, note } = sleepingEvent;
    const result = await pool.query(
      `
    INSERT INTO TABLE sleeping_calendar
      (id, childId, dateTime, sleepType, note)
    VALUES
      ($1, $2, $3, $4, $5)
    `,
      [randomUUID(), childId, dateTime, sleepType, note]
    );
    return {
      success: true,
      message: 'Saved sleeping event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not save sleeping event.',
      error
    };
  }
};

export const updateSleepingEvent = async (sleepingEvent, pool) => {
  try {
    const { childId, dateTime, sleepType, note, id } = sleepingEvent;
    const result = await pool.query(
      `
    UPDATE sleeping_calendar
    SET
      childId = $1,
      dateTime = $2,
      sleepType = $3,
      note = $4
    WHERE id = $5
    `,
      [childId, dateTime, sleepType, note, id]
    );

    return {
      success: true,
      message: 'Updated sleeping event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not update sleeping event.',
      error
    };
  }
};

export const deleteSleepingEvent = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM sleeping_calendar
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Deleted sleeping event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not delete sleeping event.',
      error
    };
  }
};

export const getSleepingEventById = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM sleeping_calendar
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Found sleeping event.',
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find sleeping event.',
      error
    };
  }
};

export const findSleepingEventByChildId = async (childId, pool) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM sleeping_calendar
        WHERE childId = $1
        `,
      [childId]
    );
    return {
      success: true,
      message: 'Found sleeping events.',
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find sleeping events.',
      error
    };
  }
};
