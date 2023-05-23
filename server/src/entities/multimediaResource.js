import { randomUUID } from 'crypto';

exports.saveMultimediaResource = async (multimediaResource, pool) => {
  try {
    const { childId, date, note, path } = multimediaResource;
    const result = await pool.query(
      `
      INSERT INTO TABLE multimedia_resources
        (id, childId, date, note, path)
      VALUES
        ($1, $2, $3, $4, $5)
      `,
      [randomUUID(), childId, date, note, path]
    );
    return {
      success: true,
      message: 'Saved multimedia resource successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not save multimedia resource.',
      error
    };
  }
};

exports.updateMultimediaResource = async (multimediaResource, pool) => {
  try {
    const { childId, date, note, path, id } = multimediaResource;
    const result = await pool.query(
      `
    UPDATE multimedia_resources
    SET
      childId = $1,
      date = $2,
      note = $3,
      path = $4
    WHERE id = $5
      `,
      [childId, date, note, path, id]
    );

    return {
      success: true,
      message: 'Updated multimedia resource successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not update multimedia resource.',
      error
    };
  }
};

exports.deleteMultimediaResource = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM multimedia_resources
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Deleted multimedia resource successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not delete multimedia resource.',
      error
    };
  }
};

exports.getMultimediaResourceById = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM multimedia_resources
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Found multimedia resource.',
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find multimedia resource.',
      error
    };
  }
};

exports.findMultimediaResourceByChildId = async (childId, pool) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM multimedia_resources
        WHERE childId = $1
        `,
      [childId]
    );
    return {
      success: true,
      message: 'Found multimedia resources.',
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find multimedia resources.',
      error
    };
  }
};
