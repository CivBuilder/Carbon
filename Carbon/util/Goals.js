import { getToken } from "./LoginManager";
import { API_URL } from "../config/Api";

const API_GOAL_URL = API_URL + 'goal';
const API_GET_PREVIOUS_MONTH_EMISSIONS = API_URL + 'userEmissions/previousMonthEmissions/';
const API_GET_PREVIOUS_MONTH_LIFESTYLE_EMISSIONS = API_URL + 'userEmissions/previousMonthLifestyleEmissions/';

export const saveGoalToDatabase = async (goal) => {
    fetch(API_GOAL_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'secrettoken': await getToken(),
        },
        body: JSON.stringify({ goal: goal })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));
};

export const getPreviousMonthEmissions = async () => {
    try {
        const response = await fetch(API_GET_PREVIOUS_MONTH_EMISSIONS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
        })

        if (response.status === 200) {
            const data = await response.json();

            // Add up all the total emissions based on total_emissions and return the total
            let totalEmissions = 0;
            data.forEach((record) => {
                totalEmissions += record.total_emissions;
            });

            return totalEmissions;
        }
        else {
            console.log('Server error occured.');
        }
    } catch (error) {
        console.error(`getTotalData: ${error}`);
        throw new Error(error);
    }
}

export const getPreviousMonthLifestyleEmissions = async () => {
    try {
        const response = await fetch(API_GET_PREVIOUS_MONTH_LIFESTYLE_EMISSIONS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
        })

        if (response.status === 200) {
            const data = await response.json();

            // Add up all the total emissions based on total_emissions and return the total
            let totalLifestyleEmissions = 0;
            data.forEach((record) => {
                totalLifestyleEmissions += record.lifestyle_emissions;
            });

            return totalLifestyleEmissions;
        }
        else {
            console.log('Server error occured.');
        }
    } catch (error) {
        console.error(`getTotalData: ${error}`);
        throw new Error(error);
    }
}