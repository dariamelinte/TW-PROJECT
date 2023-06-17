const { randomUUID } = require('crypto');

exports.insert = async (pool, id, user = {}) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, gender, nationality } = user;

    console.log(id, email, password, firstName, lastName, dateOfBirth, gender, nationality, randomUUID())

    await pool.query(
      `
      INSERT INTO "user" 
        (id, email, password, "firstName", "lastName", "dateOfBirth", gender, nationality, "familyId")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [id, email, password, firstName, lastName, dateOfBirth, gender, nationality, randomUUID()]
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

exports.update = async (pool, id, user = {}) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, nationality, familyId } = user;

    await pool.query(
      `UPDATE "user" SET "firstName" = $1, "lastName" = $2, "dateOfBirth" = $3, 
        gender = $4, nationality = $5, "familyId" = $6 WHERE id = $7`,
      [firstName, lastName, dateOfBirth, gender, nationality, familyId, id]
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

exports.updateJWT = async (pool, id, jwt) => {
  try {
    await pool.query(`UPDATE "user" SET jwt = $1 WHERE id = $2`, [jwt, id]);

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

exports.updatePassword = async (pool, id, password) => {
  try {
    await pool.query(`UPDATE "user" SET password = $1 WHERE id = $2`, [password, id]);

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
    await pool.query(`DELETE FROM "user" WHERE id = $1`, [id]);

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
    const result = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
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
    const result = await pool.query(`SELECT * FROM "user" WHERE "familyId" = $1`, [familyId]);
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

exports.getByEmail = async (pool, email) => {
  try {
    const result = await pool.query(`SELECT * FROM "user" WHERE email = $1`, [email]);
    return {
      success: true,
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      result: null
    };
  }
};
