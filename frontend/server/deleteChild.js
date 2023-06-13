import { SERVER_URL, MESSAGES } from '../utils/constants.js';

export const deleteChild = async (childId) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/child?id=${childId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: MESSAGES.tryAgain
    };
  }
}