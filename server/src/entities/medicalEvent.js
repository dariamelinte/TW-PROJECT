import { randomUUID } from 'crypto';

export const saveMedicalEvent = async (medicalEvent, pool) => {
  try {
    const { childId, title, note, date, severity } = medicalEvent;
    const result = await pool.query(
      `
      INSERT INTO TABLE medical_history
        (id, childId, title, note, date, severity)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      `,
      [randomUUID(), childId, title, note, date, severity]
    );
    return {
      success: true,
      message: 'Saved medical event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not save medical event.',
      error
    };
  }
};

export const updateMedicalEvent = async (medicalEvent, pool) => {
  try {
    const { childId, title, note, date, severity } = medicalEvent;
    const result = await pool.query(
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
      success: true,
      message: 'Updated medical event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not update medical event.',
      error
    };
  }
};

export const deleteMedicalEvent = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM medical_history
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Deleted medical event successfully.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not delete medical event.',
      error
    };
  }
};

export const getMedicalEventById = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM medical_history
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Found medical event.',
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find medical event.',
      error
    };
  }
};

export const findMedicalEventByChildId = async (childId, pool) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM medical_history
        WHERE childId = $1
        `,
      [childId]
    );
    return {
      success: true,
      message: 'Found medical events.',
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: true,
      message: 'Could not find medical events.',
      error
    };
  }
};
