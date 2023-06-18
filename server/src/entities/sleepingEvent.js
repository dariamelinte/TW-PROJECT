exports.insert = async (pool, id, sleepingEvent = {}) => {
  try {
    const { childId, date, start_time, end_time, sleepType, note } = sleepingEvent;

    await pool.query(
      `
      INSERT INTO  sleeping_calendar
        (id, "childId", date, start_time, end_time, "sleepType", note)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      `,
      [id, childId, date, start_time, end_time, sleepType, note]
    );

    return {
      success: true
    };
  } catch (error) {
    console.error(error);

    return {
      success: false
    };
  }
};

exports.update = async (pool, id, sleepingEvent = {}) => {
  try {
    const { date, start_time, end_time, sleepType, note } = sleepingEvent;

    await pool.query(
      `
      UPDATE sleeping_calendar
      SET
        "date" = $1,
        start_time = $2,
        end_time = $3,
        "sleepType" = $4,
        note = $5
      WHERE id = $6
      `,
      [date, start_time, end_time, sleepType, note, id]
    );

    return {
      success: true
    };
  } catch (error) {
    console.error(error);
    return {
      success: false
    };
  }
};

exports.delete = async (pool, id) => {
  try {
    await pool.query(`DELETE FROM sleeping_calendar WHERE id = $1`, [id]);

    return {
      success: true
    };
  } catch (error) {
    console.error(error);
    return {
      success: false
    };
  }
};

exports.getById = async (pool, id) => {
  try {
    const result = await pool.query(`SELECT * FROM sleeping_calendar WHERE id = $1`, [id]);
    return {
      success: true,
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      result: null
    };
  }
};

exports.getByChildId = async (pool, childId) => {
  try {
    const result = await pool.query(`SELECT * FROM sleeping_calendar WHERE "childId" = $1`, [
      childId
    ]);
    return {
      success: true,
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      result: null
    };
  }
};