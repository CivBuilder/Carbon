import { API_URL } from "../config/Api";

export const FetchMonthEmissions = async(month, user_id) => {
  try {
    const url = `${API_URL}userEmissions/${month}/${user_id}`;
    // const url = `http://localhost:3000/api/userEmissions/${month}/${user_id}`
    console.log(`FetchMonthEmissions: Fetching data from ${url}`);

    const response = await fetch(url); //wait for response
    console.log(`FetchMonthEmissions (response):\n${response}`);
    const data = await response.json(); //get the data we need
    console.log(`FetchMonthEmissions (data):\n${data}`);

    return data;
  }
  catch (error) {
    console.log(error); //error check
  }
};