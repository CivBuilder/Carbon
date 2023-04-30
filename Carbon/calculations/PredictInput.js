//This file will predict input from 

import { API_URL } from "../config/Api";
import { getToken } from "../util/LoginManager";
import MLR from "ml-regression-multivariate-linear";

const PredictInput = async () => {
    //needs to be not hard coded
    //const url = "http://{YOURLOCALIPHERE}:3000/api/userEmissions?user_id="+ user_id; //for local hosting and testing 

    //console.log("fetching data to predict from " + url); //log to see if if it works


    let count = 0;
    //    console.log("predicting")
    data = [0, 0, 0, 0, 0]

    try {
        const response = await fetch(`${API_URL}userEmissions/getAll`, {
            //constresponse = await fetch('LOCALIPHERE/userEmissions/id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
        })
        data = await response.json(); //get the data we need

    }
    catch (error) {
        console.log(error); //error check
        return [0, 0, 0, 0, 0]
    }
    predictData = []
    for (const obj of data) {
        newValues = [0, 0, 0, 0, 0, 0]
        const value = obj.date;
        checkMonth = value.substring(5, 7);
        checkDay = value.substring(8, 11);
        checkYear = value.substring(0, 4);
        const calcDate = new Date(checkYear, checkMonth - 1, checkDay);
        checkMonth = parseInt(checkMonth)
        newValues[0] = (checkMonth <= 3) ? 0 : (checkMonth <= 6) ? 1 : (checkMonth <= 9) ? 2 :3

 
        dayOfWeek = calcDate.getUTCDay();
        newValues[1] = dayOfWeek
        newValues[2] = obj.transport_emissions;
        newValues[3] = obj.diet_emissions;
        newValues[4] = obj.lifestyle_emissions;
        newValues[5] = obj.home_emissions;
        count += 1;
        predictData.push(newValues)

    }
    const dateToday = new Date();
    const thisMonth = dateToday.getMonth() + 1;
    x1Today = (thisMonth <= 3) ? 0 : (thisMonth <= 6) ? 1 : (thisMonth <= 9) ? 2 :3
    x2Today = dateToday.getDay();
  
    const xValues = predictData.map(row => [row[0], row[1]]);
    const yTransport = predictData.map(row => [row[2]]);
    const yDiet = predictData.map(row => [row[3]]);
    const yLifestyle = predictData.map(row => [row[4]]);
    const yHome = predictData.map(row => [row[5]]);

    //Get predictions then make it 
    const result = new MLR(xValues, yTransport);
    const result2 = new MLR(xValues, yDiet);
    const result3 = new MLR(xValues, yLifestyle)
    const result4 = new MLR(xValues, yHome)

    predictedTransport = parseInt(result.predict([x1Today, x2Today]))
    predictedDiet = parseInt(result2.predict([x1Today, x2Today]))
    predictedLifestyle = parseInt(result3.predict([x1Today, x2Today]))
    predictedHome = parseInt(result4.predict([x1Today, x2Today]))
    predictedTotal = predictedTransport + predictedDiet + predictedHome
    retData = [predictedTransport, predictedDiet, predictedLifestyle, predictedHome, predictedTotal]
  retData = (hasNegative(retData) || count <= 5) ?   [0, 0, 0, 0, 0] :  retData 
  return retData
}
   


function hasNegative(numbers) {
    
    return numbers.find(num => num < 0);; // Return false if no negative number is found
}


export default PredictInput;