import { API_URL } from "../../../config/Api";
/*
    This is a function that will get the data from the server and return it
    The data is not being returned yet.
*/
const GetData = async() => {
  try {
      const user_id = 323;

      const url = API_URL + `userEmissions?user_id=${user_id}`; //http:// + local ipv4 + :3000/api/useremission to connect
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