import { SERVER_URL } from '/frontend/utils/constants.js';

export const getFriendInteractionById = async (id) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/friend-interactions?id=${id}`);
    const { success, result } = await data.json() || {};

    if (success) {
      return result;
    }
    
    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
}