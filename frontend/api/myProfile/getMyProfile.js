import { COOKIE_NAME, SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';
import { getCookie, bearerToken } from '/frontend/utils/cookie.js';
import { parseJwt } from '/frontend/utils/jwt.js';

export const getMyProfile = async () => {
  try {
    const userInfo = parseJwt(getCookie(COOKIE_NAME));
    const data = await fetch(`${SERVER_URL}/users?id=${userInfo.id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
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

export const getMyProfileRSS = async () => {
  try {
    const userInfo = parseJwt(getCookie(COOKIE_NAME));
    const data = await fetch(`${SERVER_URL}/users?id=${userInfo.id}&rss=true`, {
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