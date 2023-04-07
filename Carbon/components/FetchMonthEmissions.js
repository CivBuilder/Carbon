import { API_URL } from "../config/Api";

const TIMEOUT_DURATION = 25000;

/**
  Fetches month emissions data from the API.
  @param {string} month - The month for which to fetch emissions data.
  @param {string} user_id - The ID of the user for whom to fetch emissions data.
  @returns {Promise} A Promise that resolves with the fetched data, or rejects with an error.
  @throws {Error} If there was an error fetching the data.
  @example const data = await FetchMonthEmissions('january', '1234');
**/
export const FetchMonthEmissions = async(month, user_id) => {
  try {
    // Construct the URL for the API endpoint
    // const url = `${API_URL}userEmissions/${month}/${user_id}`; // TODO: Connect to the actual API endpoint eventually

    const url = `http://192.168.0.165:3000/api/userEmissions/${month}/${user_id}` // Using the local IPv4 for testing purposes

    // Use Promise.race() to fetch the data and timeout if it takes too long
    const response = await Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network request timed out')), TIMEOUT_DURATION)
      )
    ]);

    // Return null if response is empty
    if (response.status === 204) {
      return null;
    }

    // Parse the JSON response
    const data = await response.json();

    // Print out the data in a readable JSON format (for debugging)
    console.log(`FetchMonthEmissions (data):\n\t${JSON.stringify(data)}`);

    // Return the data
    return data;

  }
  catch (error) {
    // Log any errors and rethrow them
    console.log(`FetchMonthEmissions (error):\n\t${error}`);
    throw error;
  }
};