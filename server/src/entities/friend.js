import { randomUUID } from 'crypto';

export const createFriend = async (friend = {}, pool) => {
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
    const result = await pool.query(
      `
      INSERT INTO TABLE friend
        (id, firstName, lastName, dateOfBirth, parentName, parentContact, howTheyMet, relationship)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        randomUUID(),
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
      success: true,
      message: 'Created friend successfuly.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not create friend.',
      error
    };
  }
};

export const updateFriend = async (friend = {}, pool) => {
  try {
    const {
      id,
      firstName,
      lastName,
      dateOfBirth,
      parentName,
      parentContact,
      howTheyMet,
      relationship
    } = friend;
    const result = await pool.query(
      `
      UPDATE friend
      SET
        firstName = $1,
        lastName = $2,
        dateOfBirth = $3,
        parentName = $4,
        parentContact = $5,
        howTheyMet = $6,
        relationship = $7
      WHERE
        id = $8
      `,
      [firstName, lastName, dateOfBirth, parentName, parentContact, howTheyMet, relationship, id]
    );
    return {
      success: true,
      message: 'Updated friend successfuly.',
      result
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not create friend.',
      error
    };
  }
};

export const deleteFriend = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      DELETE FROM friend
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Deleted friend successfuly.',
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not create friend.',
      error
    };
  }
};

export const findFriendById = async (id, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM friend
      WHERE id = $1
      `,
      [id]
    );
    return {
      success: true,
      message: 'Found friend successfuly.',
      result: result?.rows?.[0]
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not find friend.',
      error
    };
  }
};

export const findAllFriends = async (childId, pool) => {
  try {
    const result = await pool.query(
      `
      SELECT * FROM friend
      WHERE childId = $1
      `,
      [childId]
    );
    return {
      success: true,
      message: 'Found friends successfuly.',
      result: result?.rows
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Could not find friends.',
      error
    };
  }
};
