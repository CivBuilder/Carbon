import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Colors } from '../styling/Colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;
const chartWidth = windowWidth - (margin * 4);
const chartHeight = 210;

const dummyData = [
    { x: "Transport", y: Math.round(Math.random() * 10000) },
    { x: "Lifestyle", y: Math.round(Math.random() * 10000) },
    { x: "Home", y: Math.round(Math.random() * 10000) },
    { x: "Diet", y: Math.round(Math.random() * 10000) },
];

//Data for later
/*
    The daily log function, this takens in a data array and maps it into a bar chart based on its values
 */
export function DailyLog ({dataArray}) {
    dataArray = dataArray.slice(0,2).concat(dataArray.slice(3))
    //Our data for bar styling the bar chart
    const barChartData = {
        labels: ['Transportation', 'Diet', 'Home', 'Overall'],
        datasets:[
            {
            data: dataArray,
            colors: [
                () =>  Colors.categories.TRANSPORTATION,
                () =>  Colors.categories.DIET,
                () =>  Colors.categories.HOME, //all colors will be MINt
                () =>  Colors.secondary.DARK_MINT,
            ]
            }
        ]
    };
        //Return the bar chart with appropriate styling.
    return (
        <BarChart
        data ={barChartData}
        chartConfig={styleBar.chartConfig}
        withCustomBarColorFromData={true}
        flatColor={true}
        style={styleBar.chart}
        width = {chartWidth}
        height = {windowHeight/3}
        withVerticalLabels ={true}
        withHorizontalLabels = {true}
        fromZero = {true}
        showBarTops = {false}
    />
    )
}

//Style bar which was created by Miguel
const styleBar = StyleSheet.create({
    container: {
        marginLeft: 100,
        flex: 1,
        justifyContent: 'center', padding: 100,
        paddingTop: 30, backgroundColor: '#ecf0f1',
        },
    chart: {
        borderRadius: 16,
        marginHorizontal: margin/2,
    },
    chartConfig: {
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 1, // optional, defaults to 2dp
        color: () => `rgba(255, 255, 255, 1)`,
        labelColor: () => `rgba(0, 0, 0, 1)`,
        barRadius: 5,
        propsForLabels: {
            fontSize: 14,
            fontWeight: '400',
        },
    },
    keyFactors: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: margin,
        marginVertical: margin-5
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
        marginVertical: 5
    },
});