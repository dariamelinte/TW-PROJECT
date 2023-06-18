const { randomUUID } = require('crypto');
const { StatusCodes } = require('http-status-codes');

const favouriteEntity = require('../entities/favourite');

exports.addFavourite = async (pool, favouriteEvent = {}) => {
  try {
    const id = randomUUID();
  
    const { success: successCreate } = await favouriteEntity.insert(pool, id, favouriteEvent);
    const { success, result } = await favouriteEntity.getById(pool, id);

    if (!successCreate || !success) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        success,
        message: 'Added event to favourites successfuly.',
        result
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not add event to favourites.',
        error
      }
    };
  }
};

exports.deleteFavourite = async (pool, id) => {
  try {
    await favouriteEntity.delete(pool, id);
    const { result } = await favouriteEntity.getById(pool, id);

    if (result) {
      throw Error();
    }

    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        message: 'Removed event from favourites successfuly.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {
        success: false,
        message: 'Could not remove event from favourites.',
        error
      }
    };
  }
};

exports.getFavouritesByUserId = async (pool, userId) => {
  try {
    const { success: success1, result: result1 } = await favouriteEntity.getByUserId(pool, userId);
    
    if (!success1) {
      throw Error();
    }
    const result = [];

    result1.forEach(async (row) => {
      const { elementId } = row;
      const { success: success2, result: result2 } = await favouriteEntity.getByElementId(pool, elementId);

      if (!success2) {
        throw Error();
      }
      result.push(result2);
    });


    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'User favourites found.'
      }
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'User favourites not found.',
        error: String(error)
      }
    };
  }
};

exports.getFavouriteById = async (pool, id) => {
  try {
    const { success, result } = await favouriteEntity.getById(pool, id);

    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Favourite event found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Favourite event not found.',
        error: String(error)
      }
    };
  }
};

exports.getFavouriteByElementId = async (pool, elementId) => {
  try {
    const { success, result } = await favouriteEntity.getByElementId(pool, elementId);

    if (!success) {
      throw Error();
    }
    return {
      statusCode: StatusCodes.OK,
      data: {
        success: true,
        result,
        message: 'Favourite event found.'
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: StatusCodes.NOT_FOUND,
      data: {
        success: false,
        message: 'Favourite event not found.',
        error: String(error)
      }
    };
  }
};
