import { SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';

export const deleteFriend = async (friendId) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/friends?id=${friendId}`, {
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