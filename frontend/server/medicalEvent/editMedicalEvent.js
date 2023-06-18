import { SERVER_URL, MESSAGES } from '../../utils/constants.js';

export const editMedicalEvent = async (id, input) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/medical-events?id=${id}`, {
      method: 'PATCH',
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