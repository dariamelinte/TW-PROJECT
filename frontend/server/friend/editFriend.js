import { SERVER_URL, MESSAGES } from '../../utils/constants.js';

export const editFriend = async (friendId, friendInput) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/friends?id=${friendId}`, {
      method: 'PATCH',
      body: JSON.stringify(friendInput),
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