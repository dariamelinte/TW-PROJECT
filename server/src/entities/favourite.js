exports.insert = async (pool, id, favouriteEvent = {}) => {
    try {
      const { userId, elementId, date, table_name } = favouriteEvent;
  
      await pool.query(
        `INSERT INTO  favourites (id, "userId", "elementId", date, table_name) 
          VALUES ($1, $2, $3, $4, $5)`,
        [id, userId, elementId, date, table_name]
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
      await pool.query(`DELETE FROM favourites WHERE id = $1`, [id]);
  
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
      const queryResult = await pool.query(`SELECT table_name FROM favourites WHERE id = $1`, [id]);
      const table_name = queryResult?.rows?.[0].toString();
    
      let query;
      if (table_name == "feeding_calendar") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    feed.date_time as "date_time", 
                    feed.note as "note",
                    feed.id as "id"
                FROM favourites fav JOIN ` + table_name + ` feed 
                ON fav."elementId" = feed.id
                WHERE fav.id = `+ id + `;`;
      } else if (table_name == "friend_interaction") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    fi.date as "date", 
                    fi.title as "title",
                    fi.note as "note",
                    fi.id as "id"
                FROM favourites fav JOIN ` + table_name + ` fi 
                ON fav."elementId" = fi.id
                WHERE fav.id = `+ id + `;`;
      } else if (table_name == "medical_history") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    mh.date as "date", 
                    mh.title as "title",
                    mh.severity as "severity",
                    mh.note as "note",
                    mh.id as "id"
                FROM favourites fav JOIN ` + table_name + ` mh 
                ON fav."elementId" = mh.id
                WHERE fav.id = `+ id + `;`;
      } else if (table_name == "multimedia_resource") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    mr.date as "date",
                    mr.note as "note",
                    mr.path as "path",
                    mr.id as "id"
                FROM favourites fav JOIN ` + table_name + ` mr 
                ON fav."elementId" = mr.id
                WHERE fav.id = `+ id + `;`;
      } else if (table_name == "sleeping_calendar") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    sleep.date as "date", 
                    sleep.start_time as "start_time", 
                    sleep.end_time as "end_time", 
                    sleep."sleepType" as "sleepType", 
                    sleep.note as "note",
                    sleep.id as "id"
                FROM favourites fav JOIN ` + table_name + ` sleep 
                ON fav."elementId" = sleep.id
                WHERE fav.id = `+ id + `;`;
      }

      const result = await pool.query(query);
    
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
  
  exports.getByUserId = async (pool, userId) => {
    try {
      const result = await pool.query(
        `
          SELECT
            "elementId", table_name 
          FROM favourites
          WHERE "userId" = $1;
        `,
        [userId]
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

  exports.getByElementId = async (pool, elementId) => {
    try {
        const queryResult = await pool.query(`SELECT table_name FROM favourites WHERE "elementId" = $1`, [elementId]);
        const table_name = queryResult?.rows?.[0].toString();

        let query;
      if (table_name == "feeding_calendar") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    feed.date_time as "date_time", 
                    feed.note as "note",
                    feed.id as "id"
                FROM favourites fav JOIN ` + table_name + ` feed 
                ON fav."elementId" = feed.id
                WHERE fav."elementId" = `+ elementId + `;`;
      } else if (table_name == "friend_interaction") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    fi.date as "date", 
                    fi.title as "title",
                    fi.note as "note",
                    fi.id as "id"
                FROM favourites fav JOIN ` + table_name + ` fi 
                ON fav."elementId" = fi.id
                WHERE fav."elementId" = `+ elementId + `;`;
      } else if (table_name == "medical_history") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    mh.date as "date", 
                    mh.title as "title",
                    mh.severity as "severity",
                    mh.note as "note",
                    mh.id as "id"
                FROM favourites fav JOIN ` + table_name + ` mh 
                ON fav."elementId" = mh.id
                WHERE fav."elementId" = `+ elementId + `;`;
      } else if (table_name == "multimedia_resource") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    mr.date as "date",
                    mr.note as "note",
                    mr.path as "path",
                    mr.id as "id"
                FROM favourites fav JOIN ` + table_name + ` mr 
                ON fav."elementId" = mr.id
                WHERE fav."elementId" = `+ elementId + `;`;
      } else if (table_name == "sleeping_calendar") {
        query = `SELECT 
                    fav.table_name as "table_name", 
                    sleep.date as "date", 
                    sleep.start_time as "start_time", 
                    sleep.end_time as "end_time", 
                    sleep."sleepType" as "sleepType", 
                    sleep.note as "note",
                    sleep.id as "id"
                FROM favourites fav JOIN ` + table_name + ` sleep 
                ON fav."elementId" = sleep.id
                WHERE fav."elementId" = `+ elementId + `;`;
      }

      const result = await pool.query(query);

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
  