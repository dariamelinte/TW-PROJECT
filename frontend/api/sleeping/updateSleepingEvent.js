import { SERVER_URL, MESSAGES } from "/frontend/utils/constants.js";
import { bearerToken } from '/frontend/utils/cookie.js';

export const editSleepingEvent = async (id, sleepingInput) => {
    try{
        const data = await fetch(`${SERVER_URL}/sleeping-calendar?id=${id}`, {
            method: 'PATCH',
            body: JSON.stringify(sleepingInput),
            headers: {
              'Content-type': 'application/json',
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