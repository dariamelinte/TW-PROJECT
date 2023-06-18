import { COOKIE_NAME, SERVER_URL, MESSAGES } from '/frontend/utils/constants.js';
import { getCookie } from '/frontend/utils/cookie.js';
import { parseJwt } from '/frontend/utils/jwt.js';

export const logout = async () => {
  try {
    const { id } = parseJwt(getCookie(COOKIE_NAME)) || {};
    const data = await fetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ id }),
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