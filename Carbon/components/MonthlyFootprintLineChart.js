import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryArea, VictoryAxis } from 'victory-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../colors/Colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;
const chartWidth = windowWidth - (20 * 2);
const chartHeight = 225;

const dummyData = [
    { x: "Nov", y: Math.round(Math.random() * 1000) },
    { x: "Dec", y: Math.round(Math.random() * 1000)},
    { x: "Jan", y: Math.round(Math.random() * 1000)},
    { x: "Feb", y: Math.round(Math.random() * 1000)},
    { x: "Mar", y: Math.round(Math.random() * 1000)},
    { x: "Apr", y: Math.round(Math.random() * 1000)},
]

/**
    Returns the current month in string format
    @returns {string} The current month name
**/
export const getCurrentMonth = () => {
    // Get the current month
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const today = new Date();

    return monthNames[today.getMonth()];
}

/**
    Calculates the maximum domain for a given dataset and adds an offset of 20% to the result.
    @param {array} data - The dataset to calculate the maximum domain from.
    @returns {number} The maximum domain value plus an offset of 20%.
**/
export const setMaxDomain = (data) => {
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
    @param {Object[]} data - An array of objects representing CO2 emissions for each month.
    @param {number} num - The number of months to go back in the data array.
    @returns {string} - The CO2 emissions for the specified month in a human-readable format (i.e. K, M suffixes).
**/
export function getMonthEmission(data, num) {
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


/**
    Calculates the percentage difference between two values
    @param {number} curr - The current value
    @param {number} prev - The previous value
    @returns {string} The percentage difference between the two values as a string
**/
export function getPercentDifference(curr, prev) {
    const percentageDifference = ((curr - prev) / prev) * 10;
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
                <Ionicons name="arrow-up-outline" size={20} color={percentColor} style={{alignSelf: 'center', marginBottom: 6 }} />
            ) : (
                <Ionicons name="arrow-down-outline" size={20} color={percentColor} style={{alignSelf: 'center',  marginBottom: 6 }} />
            )}
            <Text
                style={{
                    fontSize: 14,
                    paddingBottom: 6,
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
export const MonthlyFootprintChart = () => {
    // Define the maximum Y-axis value to use in the chart
    const maxY = setMaxDomain(dummyData);

    // Get the CO2 emissions for the current month and the previous month
    const currMonthEmission = getMonthEmission(dummyData, 1);
    const lastMonthEmission = getMonthEmission(dummyData, 2);

    // Calculate the percentage difference between the two months
    const percentDifference = getPercentDifference(currMonthEmission, lastMonthEmission);

    // Choose a color based on whether the percentage difference is positive or negative
    const percentColor = percentDifference <= 0 ? Colors.secondary.DARK_MINT : Colors.secondary.RED;

    return (
        <View style={{ alignContent: 'center', alignItems:'center', justifyContent: 'center',}}>
            {/* Render the current month's CO2 emissions and the percentage difference */}
            <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 6 }}>{`${currMonthEmission} lbs CO2`}</Text>
                <RenderPercentDifference percentDifference={percentDifference} percentColor={percentColor}/>
            </View>

            {/* Render the chart */}
            <View>
                <VictoryChart
                    height={chartHeight}
                    width={chartWidth}
                    maxDomain={{ y: maxY }}
                    padding={{ top: 0, bottom: margin*3, left: margin*3, right: margin }}
                >
                    {/* Renders the line chart */}
                    <VictoryLine
                        data={dummyData}
                        interpolation="natural"
                        style={{
                            data: {
                                stroke: Colors.primary.MINT,
                                strokeWidth: 2
                            },
                        }}
                    />

                    {/* Renders the area under the line chart */}
                    <VictoryArea
                        data={dummyData}
                        interpolation="natural"
                        style={{
                            data: {
                                fill: Colors.primary.MINT,
                                fillOpacity: 0.25,
                                stroke: "none",
                            }
                        }}
                    />

                    {/* Renders the y-axis */}
                    <VictoryAxis dependentAxis
                        tickFormat={tickFormat}
                        tickCount={4}
                        style={{
                            axis: { stroke: "none" },
                            ticks: { stroke: "grey", size: 3 },
                            tickLabels: { fontSize: 12, padding: 5 },
                            grid: { stroke: "grey", strokeWidth: 1, strokeDasharray: 5, opacity: 0.1}
                        }}
                    />

                    {/* Renders the x-axis */}
                    <VictoryAxis crossAxis/>
                </VictoryChart>
            </View>
        </View>
    );
};