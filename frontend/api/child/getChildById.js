import { SERVER_URL } from '/frontend/utils/constants.js';
import { bearerToken } from '/frontend/utils/cookie.js';

export const getChildById = async (childId) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/child?id=${childId}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
    const { success, result } = (await data.json()) || {};

    if (success) {
      return result;
    }

    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
};
