import { SERVER_URL } from "/frontend/utils/constants.js";
import { bearerToken } from '/frontend/utils/cookie.js';

export const getSleepingEventById = async (id) => {
    try{
        const data = await fetch(`${SERVER_URL}/sleeping-calendar?id=${id}`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        const { success, result } = await data.json() || {};

        if (success){
            return result;
        }

        return {};
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getSleepingEventByIdRSS = async (id) => {
    try{
        const data = await fetch(`${SERVER_URL}/sleeping-calendar?id=${id}&rss=true`, {
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