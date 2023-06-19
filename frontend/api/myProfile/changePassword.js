import { SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';
import { bearerToken } from '/frontend/utils/cookie.js';

export const changePassword = async (id, input) => {
  try {
    const data = await fetch(`${SERVER_URL}/auth/change-password?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${bearerToken}`
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