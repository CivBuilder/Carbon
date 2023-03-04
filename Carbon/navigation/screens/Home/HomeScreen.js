import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { lineChartData, progressRingData } from './ChartData.js';

// =====================
//     Chart Styles
// =====================
const windowWidth = Dimensions.get("window").width;
const chartHorizontalMargin = 20;
const chartWidth = windowWidth - chartHorizontalMargin;
const chartHeight = 200;
const chartStyle = {
    borderRadius: 16,
    marginHorizontal: chartHorizontalMargin/2,
};
const chartConfigStyle = {
    backgroundColor: "#51b885",
    backgroundGradientFrom: "#74c69d",
    backgroundGradientTo: "#8bd0ad",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
        r: "5",             // circle size
        strokeWidth: "2",   //circle border size
        stroke: "#8bd0ad"   //circle border color
    }
};

// =====================
//     Text Style
// =====================
const textStyle = {
    marginTop: 10,
    marginLeft: chartHorizontalMargin / 2,
    fontSize: 16,
    fontWeight: 'bold'
};


// =====================
//     Home Screen
// =====================
export default function HomeScreen({ navigation }) {
    return (
        <View>
            <View>
                <Text style={textStyle}> Progress Review </Text>
                <ScrollView
                    horizontal
                    pagingEnabled
                    snapToInterval={windowWidth}
                    decelerationRate={0.8}
                    contentContainerStyle={{marginVertical: 10}}
                >
                    <LineChart
                        data={lineChartData}
                        width={chartWidth}
                        height={chartHeight}
                        //yAxisLabel=""
                        yAxisSuffix=" lb"
                        yAxisInterval={1}
                        chartConfig={chartConfigStyle}
                        style={chartStyle}
                        bezier
                    />
                    <ProgressChart
                        data={progressRingData}
                        width={chartWidth}
                        height={chartHeight}
                        strokeWidth={12}
                        radius={24}
                        chartConfig={chartConfigStyle}
                        hideLegend={false}
                        style={chartStyle}
                    />
                </ScrollView>
            </View>

            <View>
                <Text style={textStyle}> What's New </Text>
            </View>
        </View>
    );
};