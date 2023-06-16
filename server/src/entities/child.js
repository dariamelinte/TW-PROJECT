exports.insert = async (pool, id, child = {}) => {
  try {
    const {
      familyId,
      firstName,
      lastName,
      dateOfBirth,
      gender = null,
      nationality = null,
      weight = null,
      height = null
    } = child;

    await pool.query(
      `
      INSERT INTO child
        (id, "familyId", "firstName", "lastName", "dateOfBirth", gender, nationality, weight, height)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [id, familyId, firstName, lastName, dateOfBirth, gender, nationality, weight, height]
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

exports.update = async (pool, id, child = {}) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, nationality, weight, height } = child;

    await pool.query(
      `UPDATE child SET "firstName" = $1, "lastName" = $2, "dateOfBirth" = $3, gender = $4,
        nationality = $5, weight = $6, height = $7 WHERE id = $8`,
      [firstName, lastName, dateOfBirth, gender, nationality, weight, height, id]
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
    await pool.query(`DELETE FROM child WHERE id = $1`, [id]);

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
    const result = await pool.query(`SELECT * FROM child WHERE id = $1`, [id]);
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

exports.getByFamilyId = async (pool, familyId) => {
  try {
    const result = await pool.query(`SELECT * FROM child WHERE "familyId" = $1`, [familyId]);
    return {
      success: true,
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      result: []
    };
  }
};

exports.getAll = async (pool) => {
  try {
    const result = await pool.query(`SELECT * FROM child`);
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
