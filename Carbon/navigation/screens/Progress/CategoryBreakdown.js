import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { FetchMonthEmissions } from '../../../components/FetchMonthEmissions';
import { ScreenNames } from '../Main/ScreenNames';
import LoadingIndicator from '../../../components/LoadingIndicator';
import CategoryChart from './CategoryChart';
import KeyFactors from './KeyFactors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;
const chartWidth = windowWidth - (margin * 2);
const chartHeight = 100;

const dummyData = [
    { x: "Transport", y: Math.round(Math.random() * 10000) },
    { x: "Lifestyle", y: Math.round(Math.random() * 10000) },
    { x: "Home", y: Math.round(Math.random() * 10000) },
    { x: "Diet", y: Math.round(Math.random() * 10000) },
];

// Ticket C4-19
/**
    This function fetches and aggregates emissions data by category for a given month and user ID from the server.

    @param {string} yearMonth - The year and month in YYYY-MM format
    @param {function} setError - A function that takes an error object as its parameter to update the error state of the component.
    @throws {Error} - An error is thrown if the network request times out or if an error occurs while fetching data.
    @returns {Promise<Array>} - An array of objects containing the total emissions data within their respective categories.
**/
export async function getData(yearMonth, setError) {
    try {
        // Fetch data from the backend server for the given month
        const fetched_data = await Promise.race([
            FetchMonthEmissions(yearMonth),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('Network request timed out'));
                }, 25000);
            })
        ]);

        // Return null if no data is fetched
        if (!fetched_data || fetched_data.length === 0) {
            return null;
        }

        // Add up each individual data based on categories
        let transportTotal = 0;
        let homeTotal = 0;
        let dietTotal = 0;

        fetched_data.forEach((data) => {
            transportTotal += data.transport_emissions;
            homeTotal += data.home_emissions;
            dietTotal += data.diet_emissions;
        });

        // Return with all the fetched data added up within their respective categories
        const emissionsData = [
            { x: "Transport", y: transportTotal },
            { x: "Home", y: homeTotal },
            { x: "Diet", y: dietTotal },
        ];

        return emissionsData;
    }
    catch (error) {
        console.error(`getData: ${error}`);
        setError(error);
        return null;
    }
}

/**
    This asynchronous function fetches data for a given month and year and updates the state of the component with the retrieved data.
    If there is an error, the function sets the state for the data, total, and error to a default value.

    @param {string} currentYearMonth - The month and year for which to fetch data.
    @param {function} setData - A state setter function to set the fetched data.
    @param {function} setTotal - A state setter function to set the total value calculated from the fetched data.
    @param {function} setError - A state setter function to set the error state of the component.
    @returns {Promise<void>} - A promise that resolves when the data has been fetched and the state has been updated.
    @throws {Error} - If there is a problem fetching the data.
*/
export async function fetchData(currentYearMonth, setData, setTotal, setError) {
    let newData;
    try {
        newData = await getData(currentYearMonth, setError);
    } catch (error) {
        setError(error);
        console.error(`ChartData (fetchData): ${error}`);
    }

    if (newData && newData.length) {
        setData(newData);
        setTotal(newData.reduce((acc, datum) => acc + datum.y, 0));
    } else {
        setData([]);
        setTotal(0);
    }
};

/**
    Renders the label for each section of the pie chart

    @param {Object} datum - An object representing each section of the pie chart with properties 'x' and 'y'.
    @param {number} total - The total sum of values represented in the pie chart.
    @returns {string|null} - Returns a string representing the label for each section of the pie chart, or null if the percentage is less than 4%.
**/
export const getLabel = (datum, total) => {
    const percent = Math.round((datum.y / total) * 100);
    if (percent > 4) {
        return `${datum.x}\n${Math.round((datum.y / total) * 100)}%`;
    }
    return null;
};

/**
    Retrieves the label for the selected slice in a chart.

    @param {number|null} selectedSlice - The index of the selected slice or null if no slice is selected.
    @param {Object[]} data - An array of objects representing the data for the chart.
    @param {number} data[].x - The x-coordinate of the data point.
    @param {number} data[].y - The y-coordinate of the data point representing the weight of CO2 in lbs.
    @returns {string|null} - The label for the selected slice, including the x-coordinate and the weight of CO2 in lbs, or null if no slice is selected.
**/
export const getSelectedLabel = (selectedSlice, data) => {
    if (selectedSlice !== null && data.length > selectedSlice) {
        const selectedDatum = data[selectedSlice];
        return `${selectedDatum.x}\n${selectedDatum.y} lbs CO\u2082`;
    }
    return null;
};

/**
    A component that displays a pie chart of emissions data for the current month.

    @param {Object} navigation - An object containing information about the navigation state of the component.
    @returns {JSX.Element} A JSX element that displays a pie chart of emissions data for the current month.
    @throws {Error} An error is thrown if an error occurs while fetching data.
    @example
        import { CategoryChart } from './CategoryChart';

        function MyComponent() {
            return (
                <CategoryChart navigation={navigation} />
            );
        }
**/
export const CategoryBreakdown = ({navigation}) => {
    // State variables
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedSlice, setSelectedSlice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get the current year and month in YYYY-MM format
    const now = new Date();
    const currentYearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;

    // Get the current month to display on the label
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const currMonthString = monthNames[now.getMonth()];

    // Fetches data for the current month and updates state accordingly. Handles errors and null cases.
    useEffect(() => {
        setLoading(true);
        fetchData(currentYearMonth, setData, setTotal, setError)
        .then(() => setLoading(false)) // set loading to false when data has been fetched
        .catch(() => setLoading(false)); // also set loading to false on error
    }, []);

    // Select slice on press events
    const handlePress = (event, props) => {
        setSelectedSlice(props.index);
    };

    // Loading indicator shown if loading is true.
    if(loading){
        return (
            <LoadingIndicator loading={loading}/>
        );
    }

    // Show error message if error exists.
    if (error) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 60, height: chartHeight }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Unable to connect</Text>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>Please check your network settings and try again.</Text>
            </View>
        );
    }

    // Renders a message and a button to add emissions if there is no data available for the current month.
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: chartHeight }}>
                <Text style={{ fontSize: 18 }}>You have no data for this month.</Text>
                <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION)}>
                    <View style={{ backgroundColor: Colors.primary.MINT, padding: 10, marginTop: 12, borderRadius: 12 }}>
                        <Text style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 14 }}>Add Emissions</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

  // Renders the actual pie chart if everything is working properly
  return (
    <>
      <CategoryChart data={data} />
      <KeyFactors data={data} />
    </>
  );
};