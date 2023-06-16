exports.insert = async (pool, id, friendInteraction = {}) => {
  try {
    const { friendId, date, title, note } = friendInteraction;

    await pool.query(
      `INSERT INTO  friend_interaction (id, "friendId", date, title, note) 
        VALUES ($1, $2, $3, $4, $5)`,
      [id, friendId, date, title, note]
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

exports.update = async (pool, id, friendInteraction = {}) => {
  try {
    const { date, title, note } = friendInteraction;

    await pool.query(
      `UPDATE friend_interaction SET date = $1, title = $2, note = $3 WHERE id = $4`,
      [date, title, note, id]
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
    await pool.query(`DELETE FROM friend_interaction WHERE id = $1`, [id]);

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
    const result = await pool.query(`SELECT * FROM friend_interaction WHERE id = $1`, [id]);
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

exports.getByChildId = async (pool, childId, friendId) => {
  try {
    const result = await pool.query(
      `
        SELECT
          fi.id as "id",
          fi.date as "date",
          fi.title as "title",
          fi.note as "note"
        FROM friend_interaction fi JOIN friend f
        ON fi."friendId" = f.id
        WHERE f."childId" = $1 AND fi."friendId" = $2
        ORDER BY fi.date DESC;
      `,
      [childId, friendId]
    );
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
