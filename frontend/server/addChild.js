import { SERVER_URL, MESSAGES } from '../utils/constants.js';

export const addChild = async (childInput) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/child`, {
      method: 'POST',
      body: JSON.stringify(childInput),
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