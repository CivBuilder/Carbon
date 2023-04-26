//This file will predict input from 

import { API_URL } from "../config/Api";
import { getToken } from "../util/LoginManager";
import MLR from "ml-regression-multivariate-linear";

const PredictInput = async () => {
    try {
        const user_id = 323; //needs to be not hard coded
        //const url = "http://{YOURLOCALIPHERE}:3000/api/userEmissions?user_id="+ user_id; //for local hosting and testing 

        //console.log("fetching data to predict from " + url); //log to see if if it works


        let count = 0;
        //console.log("predicting")
        const response = await fetch(`${API_URL}userEmissions/id`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
        })
        predictData = []
        const data = await response.json(); //get the data we need
        for (const obj of data) {
            newValues = [0, 0, 0, 0, 0, 0]
            const value = obj.date;
            checkMonth = value.substring(5, 7);
            checkDay = value.substring(8, 11);
            checkYear = value.substring(0, 4);
            const calcDate = new Date(checkYear, checkMonth - 1, checkDay);
            checkMonth = parseInt(checkMonth)
            if (checkMonth <= 3) {
                newValues[0] = 0;
            }
            else if (checkMonth <= 6) {
                newValues[0] = 1;
            }
            else if (checkMonth <= 9) {
                newValues[0] = 2;
            }
            else {
                newValues[0] = 3;
            }
            dayOfWeek = calcDate.getUTCDay();
            newValues[1] = dayOfWeek
            newValues[2] = obj.transport_emissions;
            newValues[3] = obj.diet_emissions;
            newValues[4] = obj.lifestyle_emissions;
            newValues[5] = obj.home_emissions;
            count += 1;
            predictData.push(newValues)

            if (count >= 200) //safety
            {
                break
            }

        }
        const dateToday = new Date();
        const thisMonth = dateToday.getMonth() + 1;
        x1Today = 0
        x2Today = dateToday.getDay();
        if (thisMonth <= 3) {
            x1Today = 0;
        }
        else if (thisMonth <= 6) {
            x1Today = 1;
        }
        else if (thisMonth <= 9) {
            x1Today = 2;
        }
        else {
            x1Today = 3;
        }
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
        predictedTotal = predictedTransport + predictedDiet + predictedLifestyle + predictedHome

        const retData = [predictedTransport, predictedDiet, predictedLifestyle, predictedHome, predictedTotal]


        if (hasNegative(retData)) {
            return [0, 0, 0, 0, 0];
        }

        return retData
    }
    catch (error) {
        console.log(error); //error check
    }
}

function hasNegative(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < 0) {
            return true; // Return true if a negative number is found
        }
    }
    return false; // Return false if no negative number is found
}


export default PredictInput;