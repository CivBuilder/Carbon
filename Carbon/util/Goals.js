import { getToken } from "./UserManagement";
import { API_URL } from "../config/Api";
import moment from 'moment';

const API_GET_CURRENT_GOAL = API_URL + 'goal/getGoal';
const API_GOAL_URL = API_URL + 'goal/setGoal';
const API_GET_PREVIOUS_MONTH_EMISSIONS = API_URL + 'userEmissions/previousMonthEmissions/';
const API_GET_LAST_CALENDAR_MONTH_EMISSIONS = API_URL + 'userEmissions/lastCalendarMonthEmissions/';
const API_GET_THIS_CALENDAR_MONTH_EMISSIONS = API_URL + 'userEmissions/thisCalendarMonthEmissions/';
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

export const getLastCalendarMonthEmissions = async () => {
    try {
        const response = await fetch(API_GET_LAST_CALENDAR_MONTH_EMISSIONS, {
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

export const getThisCalendarMonthEmissions = async () => {
    try {
        const response = await fetch(API_GET_THIS_CALENDAR_MONTH_EMISSIONS, {
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

export const getCurrentGoal = async () => {
    try {
        const response = await fetch(API_GET_CURRENT_GOAL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'secrettoken': await getToken(),
            },
        })

        if (response.status === 200) {
            const goal = await response.json();

            return goal;
        }
        else {
            console.log('Server error occured.');
        }
    } catch (error) {
        console.error(`getCurrentGoal: ${error}`);
        throw new Error(error);
    }
}

export const getGoalProgress = async () => {
    const res = await getCurrentGoal();
    const goal = res.goal;
    const lastMonthEmissions = await getLastCalendarMonthEmissions();
    const thisMonthEmissions = await getThisCalendarMonthEmissions();

    // get how many days there have been so far this month
    const currentDate = new Date(); // Create a new Date object with the current date and time
    const currentDayOfMonth = currentDate.getDate(); // Get the current day of the month
    const daysInMonth = moment(currentDate).daysInMonth();
    const daysSoFarThisMonth = currentDayOfMonth - 1; // Calculate the number of days so far this month

    const emissionsPerDay = thisMonthEmissions / daysSoFarThisMonth; // Calculate the emissions so far this month
    // multiply by amount of days this month
    const anticipatedEmissions = emissionsPerDay * daysInMonth; // Calculate the anticipated emissions for the whole month

    // Calculate the goal progress
    const factor = 1 - (goal / 100); // Calculate the factor to multiply the days by to get the goal for that day
    const thisMonthGoalEmissions = factor * lastMonthEmissions;

    if (anticipatedEmissions >= thisMonthGoalEmissions) {
        /// will not reach goal, will be over goal.
        return false;
    }
    else {
        // will be under goal
        return true;
    }
}
