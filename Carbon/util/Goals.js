import { FetchMonthEmissions } from "../components/FetchMonthEmissions";
import { getToken, getAuthHeader } from "./LoginManager";
import { API_URL } from "../config/Api";
import React from 'react';

const API_GOAL_URL = API_URL + 'goal';
const API_GET_PREVIOUS_MONTH_EMISSIONS = API_URL + 'userEmissions/previousMonthEmissions/';

export const saveGoalToDatabase = async () => {
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
    // // Get the previous month and the current year
    // const currentDate = new Date();
    // let currentYear = currentDate.getFullYear();
    // let previousMonth = currentDate.getMonth() + 1;
    // if (previousMonth < 1) {
    //     previousMonth += 12;
    //     currentYear -= 1;
    // }
    // // Convert the month and year to strings
    // const monthString = previousMonth.toString().padStart(2, '0');
    // const yearString = currentYear.toString();
    // const yearMonth = `${yearString}-${monthString}`;
    // // Check if yearMonth is in correct format
    // const isValidYearMonth = /^\d{4}-\d{2}$/.test(yearMonth);
    // if (!isValidYearMonth) {
    //     throw new Error('FetchMonthEmissions: yearMonth is not in the correct format (YYYY-MM)');
    // }

    try {
        // Fetch data from the backend server for the given month
        // const response = await fetch(API_GET_PREVIOUS_MONTH_EMISSIONS, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'secrettoken': await getToken(),
        //     },
        //     body: JSON.stringify({ yearMonth: yearMonth })
        // })

        const response = await fetch(API_GET_PREVIOUS_MONTH_EMISSIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
        })

        console.log('back with Mr. Goop');

        // Return null if no data is fetched
        // if (!fetchedData || fetchedData.length === 0) {
        //     return 0;
        // }
        if (response.status === 200) {
            const data = await response.json();

            console.log('data :>> ', data);

            // Add up all the total emissions based on total_emissions and return the total
            let totalEmissions = 0;
            data.forEach((record) => {
                totalEmissions += record.total_emissions;
            });

            return totalEmissions;
        }
        else {
            console.log('sorry gooperini');
        }
    } catch (error) {
        console.error(`getTotalData: ${error}`);
        throw new Error(error);
    }
}