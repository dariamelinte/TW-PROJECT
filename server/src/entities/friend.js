exports.insert = async (pool, id, friend = {}) => {
  try {
    const {
      childId,
      firstName,
      lastName,
      dateOfBirth,
      parentName,
      parentContact,
      howTheyMet,
      relationship
    } = friend;

    await pool.query(
      `
      INSERT INTO friend
        (id, "childId", "firstName", "lastName", "dateOfBirth", "parentName", "parentContact", "howTheyMet", relationship)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        id,
        childId,
        firstName,
        lastName,
        dateOfBirth,
        parentName,
        parentContact,
        howTheyMet,
        relationship
      ]
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

exports.update = async (pool, id, friend = {}) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      parentName,
      parentContact,
      howTheyMet,
      relationship
    } = friend;

    await pool.query(
      `UPDATE friend SET "firstName" = $1, "lastName" = $2, "dateOfBirth" = $3, "parentName" = $4,
        "parentContact" = $5, "howTheyMet" = $6, relationship = $7 WHERE id = $8`,
      [firstName, lastName, dateOfBirth, parentName, parentContact, howTheyMet, relationship, id]
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
    await pool.query(`DELETE FROM friend WHERE id = $1`, [id]);

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
    const result = await pool.query(`SELECT * FROM friend WHERE id = $1`, [id]);
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
    const result = await pool.query(`SELECT * FROM friend WHERE "childId" = $1`, [childId]);
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
