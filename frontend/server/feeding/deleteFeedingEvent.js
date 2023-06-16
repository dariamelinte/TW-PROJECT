import { SERVER_URL, MESSAGES } from "../../utils/constants.js";

export const deleteFeedingEvent = async (childId, id) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/feeding-calendar/card?childId=${childId}&cardId=${id}`, {
            method: 'DELETE',
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