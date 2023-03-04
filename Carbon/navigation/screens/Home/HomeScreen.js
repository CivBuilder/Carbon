import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { lineChartData, progressRingData } from './ChartData.js';
import { Colors } from '../../../colors/Colors';

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
    backgroundColor: Colors.primary.MINT,
    backgroundGradientFrom: Colors.primary.MINT,
    backgroundGradientTo: Colors.primary.MINT,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
        r: "5",                         // circle size
        strokeWidth: "2",               //circle border size
        stroke: Colors.primary.MINT     //circle border color
    }
};

// =====================
//     Text Style
// =====================
const textStyle = {
    marginTop: 10,
    marginLeft: chartHorizontalMargin / 4,
    fontSize: 20,
    fontWeight: 'bold'
};


// =====================
//     Home Screen
// =====================
export default function HomeScreen({ navigation }) {
    return (
        <View>
            <View>
                <Text style={{...textStyle, fontSize: 25}}> Hello, Carbon User </Text>
            </View>
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