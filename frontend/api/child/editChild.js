import { SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';
import { bearerToken } from '/frontend/utils/cookie.js';

export const editChild = async (id, childInput) => {
  try {
    const data = await fetch(`${SERVER_URL}/child?id=${id}`, {
      method: 'PATCH',
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