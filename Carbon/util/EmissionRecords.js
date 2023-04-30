import { API_URL } from "../config/Api";
import { getToken } from "./UserManagement";

export const getRecentEmissions = async () => {
  // console.log(`getRecentEmissions: Fetching recent records`);
  try {
    const url = `${API_URL}userEmissions/recentRecords`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secrettoken': await getToken(),
      },
    });

    if (response.status === 204) return null;

    const data = await response.json();
    // console.log(`getRecentEmissions:\n\t${JSON.stringify(data)}`);
    // console.log('getRecentEmissions: Fetching complete!');

    return data;
  } catch (error) {
    console.error(`ERROR: getRecentEmissions:\n\t${error}`);
    throw error;
  }
};