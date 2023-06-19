import { SERVER_URL } from "/frontend/utils/constants.js";
import { bearerToken } from "/frontend/utils/cookie.js";

export const getFeedingEvents = async (childId) => {
    try{
        const data = await fetch(`${SERVER_URL}/feeding-calendar?childId=${childId}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        const { success, result } = await data.json() || {};

        if (success){
            return result;
        }

        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getFeedingEventsRSS = async (childId) => {
    try{
        const data = await fetch(`${SERVER_URL}/feeding-calendar?childId=${childId}&rss=true`, {
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