import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { VictoryChart, VictoryLine, VictoryArea, VictoryAxis, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip } from 'victory-native';
import { Svg, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

import { Colors } from '../colors/Colors';
import { FetchMonthEmissions } from './FetchMonthEmissions';
// import { LoadingIndicator } from './LoadingIndicator';

const windowWidth = Dimensions.get("window").width;
const margin = 10;
const chartWidth = windowWidth - (20 * 2);
const chartHeight = 200;

// This will be used for testing purposes
const dummyData = [
    { x: "Nov", y: Math.round(Math.random() * 1000) },
    { x: "Dec", y: Math.round(Math.random() * 1000)},
    { x: "Jan", y: Math.round(Math.random() * 1000)},
    { x: "Feb", y: Math.round(Math.random() * 1000)},
    { x: "Mar", y: Math.round(Math.random() * 1000)},
    { x: "Apr", y: Math.round(Math.random() * 1000)},
]

/**
    Calculates the total emissions data for a given month by fetching the data from the backend server.
    @param {number} currentMonth - The month for which to fetch the emissions data.
    @param {function} setError - A function to set error in case of network request error.
    @returns {Promise<number>} - The total emissions data for the given month. Returns 0 if no data is fetched.
**/
export async function getTotalData(currentMonth, setError) {
    try {
        // Fetch data from the backend server for the given month
        const fetched_data = await Promise.race([
            FetchMonthEmissions(currentMonth, 27), // TODO: Change hard coded user_id
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

        // Add up each individual data based on categories
        let totalEmissions = 0;
        fetched_data.forEach((data) => {
            totalEmissions += data.total_emissions;
        });

        return totalEmissions;
    }
    catch (error) {
        console.error(`getTotalData: ${error}`);
        setError(error);
        return 0;
    }
}

/**
    Fetches the total emissions data for the last six months and sets the data in the component state.
    @param {Array<number>} lastSixMonths - An array of the last six months for which to fetch the emissions data.
    @param {function} setData - A function to set the fetched data in the component state.
    @param {function} setError - A function to set error in case of network request error.
    @returns {Promise<void>} - Returns nothing.
    @throws {Error} - If there is an error with the network request.
**/
const fetchTotalData = async (lastSixMonths, setData, setError) => {
    try {
        const requests = lastSixMonths.map(async (month) => {
            const totalEmissions = await getTotalData(month, setError);
            return { x: month, y: totalEmissions };
        });
        const newData = await Promise.all(requests);
        setData(newData);
    } catch (error) {
        console.error(`fetchTotalData: ${error}`);
        setError(error);
        setData([]);
    }
};

/**
    Returns the current month in string format
    @returns {string} The current month name
**/
export const getCurrentMonth = (offset = 0) => {
    // Check if offset is a number
    if (typeof offset !== 'number') {
        throw new TypeError('offset must be a number');
    }

    // Get the current month
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const today = new Date();

    return monthNames[(today.getMonth() + offset) % 12];
}

/**
    Returns an array of the last six months in the format "MMM".
    @returns {Array<string>} - An array of the last six months in the format "MMM".
**/
export const getLastSixMonths = () => {
    return [
        getCurrentMonth(7).slice(0, 3),
        getCurrentMonth(8).slice(0, 3),
        getCurrentMonth(9).slice(0, 3),
        getCurrentMonth(10).slice(0, 3),
        getCurrentMonth(11).slice(0, 3),
        getCurrentMonth(12).slice(0, 3),
    ];
}

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
export function tickFormat(tick) {
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
    Returns the CO2 emissions for the specified month from the given data.
    @param {Array<Object>} data - The array of data objects containing x and y values.
    @param {number} num - The number specifying the month from the end of the data array for which to get the emissions value.
    @returns {string} - The formatted emissions value string or empty string if there is an error.
**/
export function getStringMonthEmission(data, num) {
    try {
        if (!data || !data.length || num > data.length) {
            throw new Error("getStringMonthEmission: Invalid data or num value");
        }

        const { y } = data[data.length - num];

        // Check if value is in millions
        if (y >= 1_000_000) {
            return `${(y / 1_000_000).toFixed(1)}M`;
        }

        // Check if value is in thousands
        if (y >= 1_000) {
            return `${(y / 1_000).toFixed(1)}K`;
        }

        // Value is less than 1,000
        return y.toString();
    }

    catch (error){
        console.error(error);
        return '';
    }
}

/**
    Returns the emissions value for the month specified by the given number from the end of the data array.
    @param {Array<Object>} data - The array of data objects containing x and y values.
    @param {number} num - The number specifying the month from the end of the data array for which to get the emissions value.
    @returns {number} - The emissions value or 0 if there is an error.
**/
export function getMonthEmission(data, num) {
    try {
        if (!data || !data.length || num > data.length) {
            throw new Error("getMonthEmission: Invalid data or num value");
        }
        const { y } = data[data.length - num];
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
                <Ionicons name="caret-up" size={16} color={percentColor} style={{alignSelf: 'center', marginBottom: 9, marginRight: 4 }} />
            ) : (
                <Ionicons name="caret-down" size={16} color={percentColor} style={{alignSelf: 'center', marginBottom: 9, marginRight: 4 }} />
            )}
            <Text
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
export const MonthlyFootprintChart = ({navigation}) => {
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
    // data = dummyData;
    // console.log(JSON.stringify(data, null, 2));

    // Define the maximum Y-axis value to use in the chart
    const maxY = data.length ? setMaxDomain(data) : 0;

    // Get the CO2 emissions for the current month as a string
    const currStringMonthEmission = data.length ? getStringMonthEmission(data, 1) : '';

    // Get the CO2 emissions for the current month and the previous month
    const currMonthEmission = data.length ? getMonthEmission(data, 1) : 0;
    const lastMonthEmission = data.length ? getMonthEmission(data, 2) : 0;

    // Calculate the percentage difference between the two months
    const percentDifference = data.length ? getPercentDifference(currMonthEmission, lastMonthEmission) : 0;

    // Choose a color based on whether the percentage difference is positive or negative
    const percentColor = percentDifference <= 0 ? Colors.secondary.DARK_MINT : Colors.secondary.RED;


    // Show loading indicator if loading is true
    // TODO: Fix the error when trying to render LoadingIndicator component
    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <LoadingIndicator loading={loading}/> */}
                <ActivityIndicator
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
                    testID="loading-indicator"/>
            </View>
        );
    }

    // Show error message if error exists.
    if (error) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 60}}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Unable to connect</Text>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>Please check your network settings and try again.</Text>
            </View>
        );
    }

    // Renders a message and a button to add emissions if there is no data available for the current month.
    // TODO: Change the navigation from ADD GOAL to RECORD EMISSIONS
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>No data found in the last 6 months.</Text>
                <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ADD_GOAL)}>
                    <View style={{ backgroundColor: Colors.primary.MINT, padding: 10, marginTop: 12, borderRadius: 12 }}>
                        <Text style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 14 }}>Add Emissions</Text>
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
                    padding={{ top: 0, bottom: margin*3, left: margin*3, right: margin * 2 }}
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
                            />
                        }
                    />

                    {/* Renders the y-axis */}
                    <VictoryAxis dependentAxis
                        tickFormat={tickFormat}
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