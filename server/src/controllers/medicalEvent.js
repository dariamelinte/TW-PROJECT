const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const medicalEventEntity = require('../entities/medicalEvent');

exports.createMedicalEvent = async (pool, medicalEvent = {}) => {
  try {
    const id = randomUUID();
  
    const { success: successCreate } = await medicalEventEntity.insert(pool, id, medicalEvent);
    const { success, result } = await medicalEventEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Created medical event successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not create new medical event.',
        error
      }
    };
  }
};

exports.updateMedicalEvent = async (pool, id, medicalEvent = {}) => {
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

    const { result: old } = await medicalEventEntity.getById(pool, id);
    const { success: successUpdate } = await medicalEventEntity.update(pool, id, {
      childId: medicalEvent.childId || old.childId,
      title: medicalEvent.title || old.title,
      note: medicalEvent.note || old.note,
      date: medicalEvent.date || old.date,
      severity: medicalEvent.severity || old.severity,
    });

    const { success, result } = await medicalEventEntity.getById(pool, id);

    if (!successUpdate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.ACCEPTED,
      data: {
        success: true,
        message: 'Updated medical event successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not update medical event.',
        error
      }
    };
  }
};

exports.deleteMedicalEvent = async (pool, id) => {
  try {
    await medicalEventEntity.delete(pool, id);
    const { result } = await medicalEventEntity.getById(pool, id);

    if (result) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Deleted medical event successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not delete medical event.',
        error
      }
    };
  }
};

exports.getMedicalEventById = async (pool, id) => {
  try {
    const { success, result } = await medicalEventEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Medical event found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Medical event not found.',
        error: String(error)
      }
    };
  }
};

exports.getMedicalEventByChildId = async (pool, childId, friendId) => {
  try {
    const { success, result } = await medicalEventEntity.getByChildId(pool, childId, friendId);

    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Medical events found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Medical events not found.',
        error: String(error)
      }
    };
  }
};
