exports.insert = async (pool, id, feedingEvent = {}) => {
  try {
    const { childId, dateTime, note } = feedingEvent;

    await pool.query(
      `
      INSERT INTO  feeding_calendar
        (id, "childId", "dateTime", note)
      VALUES
        ($1, $2, $3, $4)
      `,
      [id, childId, dateTime, note]
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

exports.update = async (pool, id, feedingEvent = {}) => {
  try {
    const { childId, dateTime, note } = feedingEvent;

    await pool.query(
      `
      UPDATE feeding_calendar
      SET
        "childId" = $1,
        "dateTime" = $2,
        note = $3
      WHERE id = $4
      `,
      [childId, dateTime, note, id]
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
    await pool.query(`DELETE FROM feeding_calendar WHERE id = $1`, [id]);

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
    const result = await pool.query(`SELECT * FROM feeding_calendar WHERE id = $1`, [id]);
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
    const result = await pool.query(`SELECT * FROM feeding_calendar WHERE "childId" = $1`, [
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
