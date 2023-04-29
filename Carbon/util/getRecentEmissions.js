import { API_URL } from "../config/Api";
import { getAuthHeader } from "./UserManagement";

const TIMEOUT_DURATION = 25000;

const getRecentEmissions = async () => {
  console.log(`getRecentEmissions: Fetching recent records`);
  try {
    const url = `${API_URL}userEmissions/recentRecords`;

    console.log(url);
    const response = await Promise.race([
      fetch(url, await getAuthHeader()),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network request timed out')), TIMEOUT_DURATION)
      )
    ]);
    console.log(response);

    if (response.status === 204) return null;

    const data = await response.json();
    // console.log(`getRecentEmissions:\n\t${JSON.stringify(data)}`);
    console.log('getRecentEmissions: Fetching complete!');

    return data;
  } catch (error) {
    console.error(`ERROR: getRecentEmissions:\n\t${error}`);
    throw error;
  }
};

export default getRecentEmissions;