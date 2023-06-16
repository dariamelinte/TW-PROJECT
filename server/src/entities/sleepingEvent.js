exports.insert = async (pool, id, sleepingEvent = {}) => {
  try {
    const { childId, dateTime, sleepType, note } = sleepingEvent;
    await pool.query(
      `
      INSERT INTO  sleeping_calendar
        (id, "childId", "dateTime", "sleepType", note)
      VALUES
        ($1, $2, $3, $4, $5)
      `,
      [id, childId, dateTime, sleepType, note]
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
    const { childId, dateTime, sleepType, note, id } = sleepingEvent;

    await pool.query(
      `
      UPDATE sleeping_calendar
      SET
        "childId" = $1,
        "dateTime" = $2,
        "sleepType" = $3,
        note = $4
      WHERE id = $5
      `,
      [childId, dateTime, sleepType, note, id]
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
