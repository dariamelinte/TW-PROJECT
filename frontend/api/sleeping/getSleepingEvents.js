import { SERVER_URL, MESSAGES } from "../../utils/constants.js";

export const getSleepingEvents = async (childId) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/sleeping-calendar?childId=${childId}`);
        const { success, result } = await data.json() || {};

        if (success){
            return result;
        }

        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}