import { randomUUID } from 'crypto';

export const createUser = async (user = {}, pool) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, gender, nationality } = user;

    const result = await pool.query(
      `
      INSERT INTO TABLE user 
        (id, email, password, firstName, lastName, dateOfBirth, gender, nationality, familyId)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        randomUUID(),
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        nationality,
        randomUUID()
      ]
    );

    return {
      success: true,
      message: 'Created user successfuly.',
      result
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Could not create new user.',
      data: null,
      error
    };
  }
};

export const updateUser = async (user = {}, pool) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, nationality, familyId, id } = user;
    const result = await pool.query(
      `
      UPDATE user SET
        firstName = $1,
        lastName = $2,
        dateOfBirth = $3,
        gender = $4,
        nationality = $5,
        familyId = $6
      WHERE id = $7
      `,
      [firstName, lastName, dateOfBirth, gender, nationality, familyId, id]
    );

    return {
      success: true,
      message: 'Updated user successfuly.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not update user.',
      error
    };
  }
};

export const deleteUser = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM user
      WHERE
        id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Deleted user successfuly.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not delete user.',
      error
    };
  }
};

export const getUserById = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM user
      WHERE
        id = $1
      `,
      [id]
    );
    return {
      success: true,
      result: result?.rows?.[0],
      message: 'User found.'
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'User not found.',
      error
    };
  }
};

export const getUserByFamilyId = async (familyId, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM user
      WHERE
        familyId = $1
      `,
      [familyId]
    );
    return {
      success: true,
      result: result?.rows,
      message: 'Users found.'
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Users not found.',
      error
    };
  }
};

export const getUserByEmail = async (email, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM user
      WHERE
      email = $1
      `,
      [email]
    );
    return {
      success: true,
      result: result?.rows,
      message: 'User found.'
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'User not found.',
      error
    };
  }
};
