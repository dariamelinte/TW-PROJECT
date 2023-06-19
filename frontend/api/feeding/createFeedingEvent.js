import { SERVER_URL, MESSAGES } from "/frontend/utils/constants.js";
import { bearerToken } from '/frontend/utils/cookie.js';

export const addFeedingEvent = async (feedingInput) => {
    try{
        const data = await fetch(`${SERVER_URL}/feeding-calendar`, {
            method: 'POST',
            body: JSON.stringify(feedingInput),
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