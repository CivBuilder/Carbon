import { API_URL } from "../../../config/Api";
import { getToken } from "../../../util/LoginManager";
/*
    This is a function that will get the data from the server and return it
    The data is not being returned yet.
*/
const GetData = async () => {
  try {
    //const url = "http://{YOURLOCALIPHERE}:3000/api/userEmissions?user_id="+ user_id; //for local hosting and testing 


    const response = await fetch(`http://192.168.0.6:3000/api/userEmissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'secrettoken': await getToken(),
      },
    })
    const data = await response.json(); //get the data we need
    console.log(data);
    return data
  }
  catch (error) {
    console.log(error); //error check
  }

};




export default GetData;