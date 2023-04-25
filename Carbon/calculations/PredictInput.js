//This file will predict input from 
import { API_URL } from "../config/Api";
const PredictInput = async() => {
    try {
        const user_id = 1; //needs to be not hard coded
        //const url = "http://{YOURLOCALIPHERE}:3000/api/userEmissions?user_id="+ user_id; //for local hosting and testing 

        const url = API_URL + `userEmissions/${user_id}`; //for the database n
        //console.log("fetching data to predict from " + url); //log to see if if it works
    
        const response = await fetch(url); //wait for response
        const data = await response.json(); //get the data we need
        let count = 0;
        predictData = []
        for(const obj of data)
        {   
            console.log(obj)
            newValues = [0, 0, 0, 0, 0, 0]
            const value = obj.date;
            checkMonth =value.substring(5, 7);
            checkDay = value.substring(8, 11);
            checkYear = value.substring(0, 4);
            const calcDate = new Date(checkYear, checkMonth-1, checkDay);
            checkMonth = parseInt(checkMonth)
            if (checkMonth <= 3)
            {
                newValues[0] = 0;
            }
            else if(checkMonth <= 6)
            {
                newValues[0] = 1;
            }
            else if(checkMonth <= 9)
            {
                newValues[0] = 2;
            }
            else
            {
                newValues[0] = 3;
            }
            console.log(calcDate)
            dayOfWeek = calcDate.getUTCDay();
            newValues[1] = dayOfWeek
            newValues[2] = obj.transport_emissions;
            newValues[3] = obj.diet_emissions;
            newValues[4] = obj.lifestyle_emissions;
            newValues[5] = obj.home_emissions;
            count+=1;
            console.log(newValues)
            predictData.push(newValues)

            if(count >= 200) //safety
            {
                break
            }
            
        }
        console.log(predictData)
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