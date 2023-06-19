import { SERVER_URL, MESSAGES } from "../../utils/constants.js";

export const getFeedingEventById = async (id) => {
    try{
        //TODO: send jwt to validate permission
        const data = await fetch(`${SERVER_URL}/feeding-calendar?id=${id}`);
        const { success, result } = await data.json() || {};

        if (success){
            return result;
        }

        return {};
    } catch (error) {
        console.error(error);
        return [];
    }
}