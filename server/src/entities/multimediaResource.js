exports.insert = async (pool, id, multimediaResource = {}) => {
  try {
    const { childId, date, note, path } = multimediaResource;

    await pool.query(
      `
      INSERT INTO  multimedia_resources
        (id, "childId", date, note, path)
      VALUES
        ($1, $2, $3, $4, $5)
      `,
      [id, childId, date, note, path]
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

exports.update = async (pool, id, multimediaResource = {}) => {
  try {
    const { childId, date, note, path } = multimediaResource;

    await pool.query(
      `
    UPDATE multimedia_resources
    SET
      "childId" = $1,
      date = $2,
      note = $3,
      path = $4
    WHERE id = $5
      `,
      [childId, date, note, path, id]
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
    await pool.query(`DELETE FROM multimedia_resources WHERE id = $1`, [id]);

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
    const result = await pool.query(`SELECT * FROM multimedia_resources WHERE id = $1`, [id]);
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
    const result = await pool.query(`SELECT * FROM multimedia_resources WHERE "childId" = $1`, [
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
