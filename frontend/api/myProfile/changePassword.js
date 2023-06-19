import { SERVER_URL, MESSAGES } from '../../utils/constants.js';

export const changePassword = async (id, input) => {
  try {
    const data = await fetch(`${SERVER_URL}/auth/change-password?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(input),
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