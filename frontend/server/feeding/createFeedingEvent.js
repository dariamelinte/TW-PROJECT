import { SERVER_URL, MESSAGES } from "/frontend/utils/constants.js";

export const addFeedingEvent = async (feedingInput) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/feeding-calendar`, {
            method: 'POST',
            body: JSON.stringify(feedingInput),
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