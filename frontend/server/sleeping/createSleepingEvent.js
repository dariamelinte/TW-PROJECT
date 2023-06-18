import { SERVER_URL, MESSAGES } from "/frontend/utils/constants.js";

export const addSleepingEvent = async (sleepingInput) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/sleeping-calendar`, {
            method: 'POST',
            body: JSON.stringify(sleepingInput),
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