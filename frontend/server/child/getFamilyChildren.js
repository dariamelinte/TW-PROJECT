import { COOKIE_NAME, SERVER_URL } from '/frontend/utils/constants.js';
import { parseJwt } from '/frontend/utils/jwt.js';

export const getFamilyChildren = async () => {
  try {
    const userInfo = parseJwt(COOKIE_NAME);
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/child?familyId=${userInfo.familyId}`);
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