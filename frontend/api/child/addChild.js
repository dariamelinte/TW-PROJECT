import { SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';
import { bearerToken } from '/frontend/utils/cookie.js';

export const addChild = async (childInput) => {
  try {
    const data = await fetch(`${SERVER_URL}/child`, {
      method: 'POST',
      body: JSON.stringify(childInput),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
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