const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const childEntity = require('../entities/child');

exports.createChild = async (pool, child = {}) => {
  try {
    const id = randomUUID();
    const { success: successCreate } = await childEntity.insert(pool, id, child);
    const { success, result } = await childEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created child successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new child.',
        error
      }
    };
  }
};

exports.updateChild = async (pool, id, child = {}) => {
  try {
    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: id'
        }
      };
    }

    const { result: oldChild } = await childEntity.getById(pool, id);
    const { success: successUpdate } = await childEntity.update(pool, id, {
      firstName: child.firstName || oldChild.firstName,
      lastName: child.lastName || oldChild.lastName,
      dateOfBirth: child.dateOfBirth || oldChild.dateOfBirth,
      gender: child.gender || oldChild.gender,
      nationality: child.nationality || oldChild.nationality,
      weight: child.weight || oldChild.weight,
      height: child.height || oldChild.height
    });

    const { success, result: updatedChild } = await childEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated child successfuly.',
        result: updatedChild
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update child.',
        error
      }
    };
  }
};

exports.deleteChild = async (pool, id) => {
  try {
    await childEntity.delete(pool, id);

    const { result } = await childEntity.getById(pool, id);

    if (result) {
      throw Error(`Could not properly delete child with id = ${id}`);
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted child successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete child.',
        error
      }
    };
  }
};

exports.getChildById = async (pool, id) => {
  try {
    const { success, result } = await childEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Child found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Child not found.',
        error: String(error)
      }
    };
  }
};

exports.getChildrenByFamilyId = async (pool, familyId) => {
  try {
    const { success, result } = await childEntity.getByFamilyId(pool, familyId);

    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Children found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Children not found.',
        error: String(error)
      }
    };
  }
};

exports.getChildren = async (pool) => {
  try {
    const { success, result } = await childEntity.getAll(pool);
    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Children found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Children not found.',
        error: String(error)
      }
    };
  }
};
