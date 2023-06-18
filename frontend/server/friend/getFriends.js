import { SERVER_URL } from '/frontend/utils/constants.js';

export const getFriend = async (childId) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/friends?childId=${childId}`);
    const { success, result } = await data.json() || {};
    if (success) {
      return result;
    }
    
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}