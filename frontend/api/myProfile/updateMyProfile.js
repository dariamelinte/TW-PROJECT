import { SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';
import { getCookie, bearerToken } from '/frontend/utils/cookie.js';

export const updateMyProfile = async (id, input) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/users?id=${id}`, {
      method: 'PATCH',
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