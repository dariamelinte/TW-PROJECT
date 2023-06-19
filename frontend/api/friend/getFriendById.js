import { SERVER_URL } from '/frontend/utils/constants.js';
import { bearerToken } from '/frontend/utils/cookie.js';

export const getFriendById = async (friendId) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/friends?id=${friendId}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
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

export const getFriendByIdRSS = async (friendId) => {
  try {
    const data = await fetch(`${SERVER_URL}/friends?id=${friendId}&rss=true`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}