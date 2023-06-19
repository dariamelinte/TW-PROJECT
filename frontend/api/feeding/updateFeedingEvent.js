import { SERVER_URL, MESSAGES } from "/frontend/utils/constants.js";
import { bearerToken } from "/frontend/utils/cookie.js";

export const editFeedingEvent = async (id, feedingInput) => {
    try{
        const data = await fetch(`${SERVER_URL}/feeding-calendar?id=${id}`, {
            method: 'PATCH',
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