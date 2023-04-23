import { API_URL } from "../config/Api";

const TIMEOUT_DURATION = 25000;

/**
  Fetches the emissions data for a given user and year-month combination from the API.

  @param {string} yearMonth - The year and month to fetch emissions data for in the format "YYYY-MM".
  @param {number} user_id - The ID of the user to fetch emissions data for as a non-negative integer.
  @returns {Promise} A promise that resolves with the fetched data or null if there is no data, or rejects with an error.
  @throws {Error} If there is an issue with the inputs or there is an error fetching the data.

  @example
  const data = await FetchMonthEmissions('2023-01', 1234);
*/
export const FetchMonthEmissions = async(yearMonth, user_id) => {
  console.log('FetchMonthEmissions: Fetching data...');
  try {

    // Check if yearMonth is in correct format
    const isValidYearMonth = /^\d{4}-\d{2}$/.test(yearMonth);
    if (!isValidYearMonth) {
      throw new Error('FetchMonthEmissions: yearMonth is not in the correct format (YYYY-MM)');
    }

    if (!Number.isInteger(user_id) || user_id < 0) {
      throw new Error('FetchMonthEmissions: user_id must be a non-negative whole number');
    }

    // Construct the URL for the API endpoint
    const url = `${API_URL}userEmissions/${yearMonth}/${user_id}`;

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
    // console.log(`FetchMonthEmissions (data):\n\t${JSON.stringify(data)}`);
    console.log('FetchMonthEmissions: Fetching complete!');

    // Return the data
    return data;

  }
  catch (error) {
    // Log any errors and rethrow them
    console.error(`FetchMonthEmissions (error):\n\t${error}`);
    throw error;
  }
};