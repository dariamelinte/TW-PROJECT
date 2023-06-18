const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const multimediaEntity = require('../entities/multimediaResource');

exports.createMultimedia = async (pool, multimedia = {}) => {
  try {
    const id = randomUUID();
  
    const { success: successCreate } = await multimediaEntity.insert(pool, id, multimedia);
    const { success, result } = await multimediaEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created multimedia resource successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new multimedia resource.',
        error
      }
    };
  }
};

exports.updateMultimedia = async (pool, id, multimedia = {}) => {
  try {
    if (!id) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          success: false,
          message: 'Please provide the missing fields: id',
        }
      };
    }

    const { result: old } = await multimediaEntity.getById(pool, id);
    const { success: successUpdate } = await multimediaEntity.update(pool, id, {
      childId: multimedia.childId || old.childId,
      title: multimedia.title || old.title,
      note: multimedia.note || old.note,
      date: multimedia.date || old.date,
      severity: multimedia.severity || old.severity,
    });

    const { success, result } = await multimediaEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated multimedia resource successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update multimedia resource.',
        error
      }
    };
  }
};

exports.deleteMultimedia = async (pool, id) => {
  try {
    await multimediaEntity.delete(pool, id);
    const { result } = await multimediaEntity.getById(pool, id);

    if (result) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted multimedia resource successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete multimedia resource.',
        error
      }
    };
  }
};

exports.getMultimediaById = async (pool, id) => {
  try {
    const { success, result } = await multimediaEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Multimedia resource found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Multimedia resource not found.',
        error: String(error)
      }
    };
  }
};

exports.getMultimediaByChildId = async (pool, childId, friendId) => {
  try {
    const { success, result } = await multimediaEntity.getByChildId(pool, childId, friendId);

    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Multimedia resources found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Multimedia resources not found.',
        error: String(error)
      }
    };
  }
};
