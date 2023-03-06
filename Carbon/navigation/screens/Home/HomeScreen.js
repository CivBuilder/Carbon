import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { Card } from 'react-native-elements';
import { lineChartData, progressRingData } from './ChartData.js';
import { Colors } from '../../../colors/Colors';

// =====================
//     Chart Styles
// =====================
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
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
        stroke: Colors.primary.MINT     //circle border colorn
    }
};

// =====================
//     Card Style
// =====================

const cardContainerStyle = {
    width: windowWidth / 2.25,
    height: windowHeight / 2.5,
    marginHorizontal: 5,
    borderRadius: 12,
}

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
        <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
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
                        showsHorizontalScrollIndicator={false}
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
                    <ScrollView
                        horizontal
                        pagingEnabled
                        snapToInterval={windowWidth}
                        decelerationRate={0.8}
                        contentContainerStyle={{marginBottom: 10, marginHorizontal: 5}}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Card containerStyle={cardContainerStyle}>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Divider/>
                            <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </Card>
                        <Card containerStyle={cardContainerStyle}>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Divider/>
                            <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </Card>
                        <Card containerStyle={cardContainerStyle}>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Divider/>
                            <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </Card>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};