import { SERVER_URL } from '../utils/constants.js';

export const getFamilyChildren = async () => {
  try {
    // TODO: get familyId from cookie
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/child?familyId=1`);
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