import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip } from 'victory-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import numeral from 'numeral';
import { ActivityIndicator } from 'react-native';

import { Colors } from '../styling/Colors';
import { FetchMonthEmissions } from './FetchMonthEmissions';
import { ScreenNames } from '../navigation/screens/Main/ScreenNames';
// import { LoadingIndicator } from './LoadingIndicator';

const windowWidth = Dimensions.get("window").width;
const margin = 10;
const chartWidth = windowWidth - (20 * 2);
const chartHeight = 200;

// This will be used for testing purposes
const dummyData = [
    { x: "Nov", y: Math.round(Math.random() * 1000)},
    { x: "Dec", y: Math.round(Math.random() * 1000)},
    { x: "Jan", y: Math.round(Math.random() * 1000)},
    { x: "Feb", y: Math.round(Math.random() * 1000)},
    { x: "Mar", y: Math.round(Math.random() * 1000)},
    { x: "Apr", y: Math.round(Math.random() * 1000)},
]

/**
    Calculates the total emissions data for a given month by fetching the data from the backend server.

    @param {string} yearMonth - The year and month (in 'YYYY-MM' format) for which to fetch the emissions data.
    @returns {Promise<number>} - The total emissions data for the given month. Returns 0 if no data is fetched.
    @throws {Error} - If there is an error with the network request.
*/
export async function getTotalData(yearMonth) {
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
            return 0;
        }

        // Add up all the total emissions based on total_emissions and return the total
        let totalEmissions = 0;
        fetched_data.forEach((data) => {
            totalEmissions += data.total_emissions;
        });
        return totalEmissions;

    } catch (error) {
        console.error(`getTotalData: ${error}`);
        throw new Error(error);
    }
}

/**
    Fetches the total emissions data for the last six months and sets the data in the component state.

    @param {Array<string>} lastSixMonths - An array of the last six months for which to fetch the emissions data in the format YYYY-MM.
    @param {function} setData - A function that sets the fetched data in the component state.
    @param {function} setError - A function that sets the error message in case of network request error.
    @returns {Promise<void>} Returns nothing.
    @throws {Error} If there is an error with the network request.
**/
export const fetchTotalData = async (lastSixMonths, setData, setError) => {
    try {
        const requests = lastSixMonths.map(async (yearMonth) => {
            const totalEmissions = await getTotalData(yearMonth);
            if (totalEmissions.error) {
                throw totalEmissions.error;
            }

            // Extract the month from yearMonth (YYYY-MM) and parse as string name with just the first 3 letters
            const month = parseInt(yearMonth.split('-')[1], 10);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthName = monthNames[month - 1];

            return { x: monthName, y: totalEmissions };
        });
        const newData = await Promise.all(requests);

        // Check if there are data for the last 6 months
        const allYValuesAreZero = newData.every((dataPoint) => dataPoint.y === 0);
        if (allYValuesAreZero) {
            setData([]);
            return;
        }

        setData(newData);
    } catch (error) {
        console.error(`fetchTotalData: ${error}`);
        setError(error);
        setData([]);
    }
};

/**
    Returns an array of the last six months in the format "YYYY-MM".
    @returns {Array<string>} - An array of the last six months in the format "YYYY-MM".
**/
export const getLastSixMonths = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const months = [];
    for (let i = 0; i < 6; i++) {
        let month = currentMonth - i;
        let year = currentYear;
        if (month < 1) {
            month += 12;
            year -= 1;
        }
            const monthString = month.toString().padStart(2, '0');
            const yearString = year.toString();
            const yearMonth = `${yearString}-${monthString}`;
            months.push(yearMonth);
    }
    return months.reverse();
};

/**
    Calculates the maximum domain for a given dataset and adds an offset of 20% to the result.
    @param {array} data - The dataset to calculate the maximum domain from.
    @returns {number} The maximum domain value plus an offset of 20%.
**/
export const setMaxDomain = (data) => {
    // Check if data is an array
    if (!Array.isArray(data)) {
        throw new TypeError('data must be an array');
    }

    // Get the maximum value from the data
    const maxDomain = Math.max(...data.map(item => item.y));
    const domainOffset = maxDomain * 0.2;

    // Return the maximum domain plus the offset
    return (maxDomain + domainOffset);
}

/**
    Returns a string representation of a tick value formatted with a suffix denoting magnitude.
    For example, given a tick value of 1500, returns "1.5K".
    @param {number} tick - The value of the tick to format.
    @returns {string} - A string representing the tick value with a magnitude suffix.
**/
export function tickYFormat(tick) {
    // Check if tick is a number
    if (typeof tick !== 'number') {
        throw new TypeError('tick must be a number');
    }

    // An array of magnitude suffixes for formatting the tick value.
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixIndex = 0;
    let tickValue = tick;

    // If the tick value is greater than or equal to 1000, divide it by 1000 and increment the
    // tick value is less than 1000 or the suffix index reaches the end of the suffixes array.
    while (tickValue >= 1000 && suffixIndex < suffixes.length - 1) {
        tickValue /= 1000;
        suffixIndex++;
    }

    // Format the tick value with a precision of 0 if it has no fractional part, or a precision of 1 if it does.
    const formattedValue = tickValue % 1 === 0 ? tickValue.toFixed(0) : tickValue.toFixed(1);

    // Append the appropriate suffix to the formatted tick value and return it.
    return `${formattedValue}${suffixes[suffixIndex]}`;
}

/**
    Returns the emissions value for the month specified by the given number from the end of the data array.
    @param {Array<Object>} data - The array of data objects containing x and y values.
    @param {number} index - The number specifying the month from the end of the data array for which to get the emissions value.
    @returns {number} - The emissions value or 0 if there is an error.
**/
export function getMonthEmission(data, index) {
    try {
        if (!data || !data.length || index > data.length) {
            throw new Error("getMonthEmission: Invalid data or num value");
        }
        const { y } = data[data.length - index - 1];
        return y;
    }

    catch (error) {
        console.error(error);
        return 0;
    }
}

/**
    Calculates the percentage difference between two values
    @param {number} curr - The current value
    @param {number} prev - The previous value
    @returns {string} The percentage difference between the two values as a string
**/
export function getPercentDifference(curr, prev) {
    if (prev === 0 && curr === 0) {
        return "0";
    } else if (prev === 0 && curr !== 0) {
        return "100";
    }

    const percentageDifference = ((curr - prev)) / prev * 100;
    return percentageDifference.toFixed(0).toString();
}


/**
    A component that renders a percentage difference with an up or down arrow icon based on whether the percentage difference is positive or negative.
    @param {Object} props - The props object that contains the percentage difference and color to use.
    @param {number} props.percentDifference - The percentage difference to display.
    @param {string} props.percentColor - The color to use for the percentage text and arrow icon.
    @returns {JSX.Element} - A React component that renders the percentage difference with an up or down arrow icon.
**/
export const RenderPercentDifference = ({ percentDifference, percentColor }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {percentDifference >= 0 ? (
                <Ionicons testID="up-icon" name="caret-up" size={16} color={percentColor} style={{alignSelf: 'center', marginBottom: 9, marginRight: 4 }} />
            ) : (
                <Ionicons testID="down-icon" name="caret-down" size={16} color={percentColor} style={{alignSelf: 'center', marginBottom: 9, marginRight: 4 }} />
            )}
            <Text
                testID="percentDifferenceText"
                style={{
                    fontSize: 14,
                    paddingBottom: 10,
                    color: percentColor,
                }}
            >
            {`${Math.abs(percentDifference)}% from previous month`}
            </Text>
        </View>
    );
};


/**
    Renders a line chart showing monthly CO2 emissions with the current month's emissions and
    percentage difference from the previous month displayed above the chart.
    @return the rendered React component
**/
export const MonthlyFootprintLineChart = ({navigation}) => {
    // State variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetches total_emissions data for the past 6 months. Handles errors and null cases.
    const lastSixMonths = getLastSixMonths();
    useEffect(() => {
        setLoading(true)
        fetchTotalData(lastSixMonths, setData, setError)
            .then(() => setLoading(false)) // set loading to false when data has been fetched
            .catch(() => setLoading(false)); // also set loading to false on error
    }, []);

    // (Debugging) This replaces fetched data with dummy data
    // data = dummyData;
    // console.log(JSON.stringify(data, null, 2));

    // Define the maximum Y-axis value to use in the chart
    const maxY = data.length ? setMaxDomain(data) : 0;

    // Get the CO2 emissions for the current month and the previous month
    const currMonthEmission = data.length ? getMonthEmission(data, 0) : 0;
    const lastMonthEmission = data.length ? getMonthEmission(data, 1) : 0;

    // Get the CO2 emissions for the current month as a string
    let currStringMonthEmission = '';
    if(currMonthEmission < 1000 || currMonthEmission % 1000 === 0 || currMonthEmission % 1000000 === 0)
        currStringMonthEmission = numeral(currMonthEmission).format('0a')
    else
        currStringMonthEmission = numeral(currMonthEmission).format('0.0a');

    // Calculate the percentage difference between the two months
    const percentDifference = data.length ? getPercentDifference(currMonthEmission, lastMonthEmission) : 0;

    // Choose a color based on whether the percentage difference is positive or negative
    const percentColor = percentDifference <= 0 ? Colors.secondary.DARK_MINT : Colors.secondary.RED;


    // Show loading indicator if loading is true
    // TODO: Fix the error when trying to render LoadingIndicator component
    if (loading) {
        return (
            <View style={{ height: 125, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <LoadingIndicator loading={loading}/> */}
                <ActivityIndicator
                    testID="loading-indicator"
                    size="large"
                    color={Colors.primary.RAISIN_BLACK}
                    style={{
                        position: 'absolute',
                        zIndex: 999,
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                />
            </View>
        );
    }

    // Show error message if error exists.
    if (error) {
        return (
            <View
                testID='network-error'
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 60}}
            >
                <Text testID="network-error-label1" style={{ fontSize: 18, textAlign: 'center' }}>Unable to connect</Text>
                <Text testID="network-error-label2" style={{ fontSize: 14, textAlign: 'center' }}>Please check your network settings and try again.</Text>
            </View>
        );
    }

    // Renders a message and a button to add emissions if there is no data available for the current month.
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text testID="no-data-text" style={{ fontSize: 18 }}>No data found in the last 6 months.</Text>
                <TouchableOpacity testID="record-emission-button" onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION)}>
                    <View style={{ backgroundColor: Colors.primary.MINT, padding: 10, marginTop: 12, borderRadius: 12 }}>
                        <Text testID="add-emission-text" style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 14 }}>Add Emissions</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ alignContent: 'center', alignItems:'center', justifyContent: 'center',}}>
            {/* Render the current month's CO2 emissions and the percentage difference */}
            <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 6 }}>{`${currStringMonthEmission} lbs CO\u2082`}</Text>
                <RenderPercentDifference percentDifference={percentDifference} percentColor={percentColor}/>
            </View>

            {/* Render the chart */}
            <View>
                <VictoryChart
                    height={chartHeight}
                    width={chartWidth}
                    maxDomain={{ y: maxY }}
                    padding={{ top: 5, bottom: margin*3, left: margin*4, right: margin * 2 }}
                    containerComponent={<VictoryVoronoiContainer/>}
                >
                    {/* Renders the area under the line chart */}
                    <VictoryArea
                        data={data}
                        interpolation="catmullRom"
                        style={{
                            data: {
                            fill: "url(#mintGradient)",
                            fillOpacity: 1,
                            stroke: "none"
                            }
                        }}
                    />
                    <Defs>
                        <LinearGradient id="mintGradient" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="40%" stopColor={Colors.primary.MINT} stopOpacity={.7} />
                            <Stop offset="100%" stopColor={Colors.primary.MINT} stopOpacity={.1} />
                        </LinearGradient>
                    </Defs>

                    {/* Renders the line chart */}
                    <VictoryLine
                        data={data}
                        interpolation="catmullRom"
                        style={{
                            data: {
                                stroke: Colors.primary.MINT,
                                strokeWidth: 2
                            },
                        }}
                    />

                    {/* Renders dots for each data point */}
                    <VictoryScatter
                        data={data.filter(point => point.y !== 0)}
                        size={({ active }) => active ? 7 : 4}
                        style={{
                            data: {
                                fill: Colors.primary.MINT_CREAM,
                                stroke: Colors.primary.MINT,
                                fillOpacity: 1,
                                strokeWidth: 2,
                            },
                            labels: {
                                fontSize: 12,
                                fill: Colors.secondary.DARK_MINT,
                            }
                        }}
                        labels={({ datum }) => datum.y}
                        labelComponent={
                            <VictoryTooltip
                                flyoutStyle={{ stroke: "none", fill: "none" }} // Set flyoutStyle to an empty object
                                style={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    fill: Colors.secondary.DARK_MINT,
                                }}
                                renderInPortal={false} //removes the warning error
                            />
                        }
                    />

                    {/* Renders the y-axis */}
                    <VictoryAxis dependentAxis
                        tickFormat={tickYFormat}
                        tickCount={4}
                        style={{
                            axis: { stroke: "none" },
                            ticks: { stroke: "grey", size: 3 },
                            tickLabels: { fontSize: 12, padding: 5 },
                            grid: { stroke: "grey", strokeWidth: 1, strokeDasharray: 5, opacity: 0.2}
                        }}
                    />

                    {/* Renders the x-axis */}
                    <VictoryAxis
                        crossAxis
                        domainPadding={{ x: [10, 10] }}
                    />
                </VictoryChart>
            </View>
        </View>
    );
};