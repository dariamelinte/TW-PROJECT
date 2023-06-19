import { SERVER_URL } from "/frontend/utils/constants.js";
import { bearerToken } from '/frontend/utils/cookie.js';

export const getSleepingEvents = async (childId) => {
    try{
        const data = await fetch(`${SERVER_URL}/sleeping-calendar?childId=${childId}`, {
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

export const getSleepingEventsRSS = async (childId) => {
    try{
        const data = await fetch(`${SERVER_URL}/sleeping-calendar?childId=${childId}&rss=true`, {
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