import { SERVER_URL, MESSAGES } from "/frontend/utils/constants.js";
import { getCookie, bearerToken } from '/frontend/utils/cookie.js';

export const addSleepingEvent = async (sleepingInput) => {
    try{
        const data = await fetch(`${SERVER_URL}/sleeping-calendar`, {
            method: 'POST',
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