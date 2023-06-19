import { SERVER_URL } from '/frontend/utils/constants.js';

export const getMultimediaById = async (id) => {
  try {
    // TODO: send jwt to validate permission
    const data = await fetch(`${SERVER_URL}/multimedia?id=${id}`);
    return await data.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}