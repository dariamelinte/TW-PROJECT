import { COOKIE_NAME, SERVER_URL } from '/frontend/utils/constants.js';
import { getCookie } from '/frontend/utils/cookie.js';
import { parseJwt } from '/frontend/utils/jwt.js';
import { bearerToken } from '/frontend/utils/cookie.js';

export const getFamilyChildren = async () => {
  try {
    const userInfo = parseJwt(getCookie(COOKIE_NAME));
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/child?familyId=${userInfo.familyId}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
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

export const getFamilyChildrenRSS = async () => {
  try {
    const userInfo = parseJwt(getCookie(COOKIE_NAME));
    const data = await fetch(`${SERVER_URL}/child?familyId=${userInfo.familyId}&rss=true`, {
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