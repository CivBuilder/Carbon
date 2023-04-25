//This file will predict input from 
import { API_URL } from "../config/Api";
const PredictInput = async() => {
    try {
        const user_id = 1; //needs to be not hard coded
        //const url = "http://{YOURLOCALIPHERE}:3000/api/userEmissions?user_id="+ user_id; //for local hosting and testing 

        const url = API_URL + `userEmissions/${user_id}`; //for the database n
        console.log("fetching data to predict from " + url); //log to see if if it works
    
        const response = await fetch(url); //wait for response
        const data = await response.json(); //get the data we need
        let count = 0;
        for(const obj of data)
        {   
            count+=1;
        }
        if (count <= 10)
        {
            console.log("returning");
            return [0,0,0,0];
        }

        return data
    }
    catch (error) { 
        console.log(error); //error check
    }
}
export default PredictInput;