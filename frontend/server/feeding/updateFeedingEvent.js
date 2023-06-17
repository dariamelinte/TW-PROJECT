import { SERVER_URL, MESSAGES } from "../../utils/constants.js";

export const editFeedingEvent = async (childId, id, feedingInput) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/feeding-calendar/card?childId=${childId}&cardId=${id}`, {
            method: 'PATCH',
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