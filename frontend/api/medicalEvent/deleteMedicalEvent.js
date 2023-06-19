import { SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';
import { bearerToken } from '/frontend/utils/cookie.js';

export const deleteMedicalEvent = async (id) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/medical-events?id=${id}`, {
      method: 'DELETE',
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