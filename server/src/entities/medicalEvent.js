exports.insert = async (pool, id, medicalEvent = {}) => {
  try {
    const { childId, title, note, date, severity } = medicalEvent;

    await pool.query(
      `
    INSERT INTO  medical_history
      (id, "childId", title, note, date, severity)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    `,
      [id, childId, title, note, date, severity]
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

exports.update = async (pool, id, medicalEvent = {}) => {
  try {
    const { childId, title, note, date, severity } = medicalEvent;

    await pool.query(
      `
    UPDATE medical_history
    SET
      childId = $1,
      title = $2,
      note = $3,
      date = $4,
      severity = $5
    WHERE id = $6
    `,
      [childId, title, note, date, severity, id]
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
    await pool.query(`DELETE FROM medical_history WHERE id = $1`, [id]);

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
    const result = await pool.query(`SELECT * FROM medical_history WHERE id = $1`, [id]);
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
    const result = await pool.query(`SELECT * FROM medical_history WHERE "childId" = $1`, [
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
