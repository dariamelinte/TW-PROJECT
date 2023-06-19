import { SERVER_URL, MESSAGES } from "../../utils/constants.js";

export const editSleepingEvent = async (id, sleepingInput) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/sleeping-calendar?id=${id}`, {
            method: 'PATCH',
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