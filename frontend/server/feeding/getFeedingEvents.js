import { SERVER_URL, MESSAGES } from "../../utils/constants.js";

export const getFeedingEvents = async (childId) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/feeding-calendar?childId=${childId}`);
        const { success, result } = await data.json() || {};

        console.log(success);

        if (success){
            console.lor("not a bitch");
            return result;
        }
        console.log("still a bitch");

        return [];
    } catch (error) {
        console.error(error);
        console.log("bitch");
        return [];
    }
}