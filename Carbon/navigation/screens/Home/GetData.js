import { API_URL } from "../../../config/Api";
/*
    This is a function that will get the data from the server and return it
    The data is not being returned yet.
*/
const GetData = async() => {
  try {
      const user_id = 323;
      //const url = "http://{YOURLOCALIPHERE}:3000/api/userEmissions?user_id="+ user_id; //for local hosting and testing 

      const url = API_URL + `userEmissions?user_id=${user_id}`; //for the database
      console.log("fetching data from " + url); //log to see if if it works
    
      const response = await fetch(url); //wait for response
      const data = await response.json(); //get the data we need
      console.log(data);
      return data
    }
    catch (error) { 
      console.log(error); //error check
    }

};
  
  


export default GetData;