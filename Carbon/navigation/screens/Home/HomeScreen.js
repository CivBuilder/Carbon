import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { Header, Icon, Card } from 'react-native-elements';
import { ProgressCircle } from 'react-native-svg-charts';
import { LinearGradient, Stop } from 'react-native-svg';

import { lineChartData, progressRingData } from './ChartData.js';
import { Colors } from '../../../colors/Colors';
import { SettingsScreen } from '../Settings/SettingsScreen'



export const CarbonFootprint = () => {
    const maxFootprint = 100000;
    const userFootprint = 69420;
    const percentFootprint = userFootprint / maxFootprint;

    return (
        <ProgressCircle
            style={{ height: 250, marginBottom: -110, marginVertical: 20 }}
            progress={percentFootprint}
            progressColor={Colors.primary.MINT}
            backgroundColor={'rgba(194, 65, 244, 0.1)'}
            strokeWidth={14}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
        >
            {/* TODO: Add gradient where it starts mint green at 0 then fades to red at 70% */}
            {/* <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={Colors.primary.MINT} />
                <Stop offset="70%" stopColor={Colors.secondary.CELADON} />
            </LinearGradient> */}
            <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', top: -40,}}>
                <Text style={{ fontSize: userFootprint >= 100000 ? 32 : 40, fontWeight: 'bold' }}>{userFootprint}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>lbs CO₂ </Text>
            </View>
        </ProgressCircle>
    );
};

export default function HomeScreen({ navigation }) {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const horizontalMargin = 20;
    const chartWidth = windowWidth - horizontalMargin;
    const chartHeight = 200;

    const handleSettingsPress = () => {
        navigation.navigate('SettingsScreen');
    };

    const styles = StyleSheet.create({
        title: {
            marginTop: 10,
            marginLeft: horizontalMargin / 4,
            fontSize: 25,
            fontWeight: 'bold'
        },
        header: {
            marginTop: 10,
            marginLeft: horizontalMargin / 2,
            fontSize: 16,
            fontWeight: 'bold'
        },
        chart: {
            borderRadius: 16,
            marginHorizontal: horizontalMargin/2,
        },
        chartConfig: {
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
        },
        chartScrollViewContentContainer: {
            marginVertical: 10,
        },
        cardScrollViewContentContainer: {
            marginBottom: 10,
        },
        cardContainer: {
            width: windowWidth / 2.25,
            height: windowHeight / 2.5,
            borderRadius: 12,
            marginHorizontal: horizontalMargin/2,
            marginBottom: 20,
        }
    });

    return (
        <View style={{height: windowHeight}}>
            <Header
                transparent
                backgroundColor={`${Colors.primary.MINT_CREAM}`}
                placement="center"
                centerComponent={
                    <Image
                        source={require('../../../assets/Carbon_Logo.png')}
                        style={{
                            width: 1080 / 12,
                            height: 356 / 12,
                            resizeMode: 'cover',
                        }}
                    />
                }
                rightComponent={
                    <Icon
                        name='settings'
                        onPress={()=>{console.log("Settings Button Clicked")}}
                    />
                }
            />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                <View>
                    {/* <View>
                        <Text style={styles.title}> Hello, Carbon User </Text>
                    </View> */}
                    <View>
                        <Text style={styles.header}>This Month's Footprint</Text>
                        <CarbonFootprint />
                        {/* <ScrollView
                            horizontal
                            pagingEnabled
                            snapToInterval={windowWidth}
                            decelerationRate={0.8}
                            contentContainerStyle={styles.chartScrollViewContentContainer}
                            showsHorizontalScrollIndicator={false}
                        >
                            <LineChart
                                data={lineChartData}
                                width={chartWidth}
                                height={chartHeight}
                                //yAxisLabel=""
                                yAxisSuffix=" lb"
                                yAxisInterval={1}
                                chartConfig={styles.chartConfig}
                                style={styles.chart}
                                bezier
                            />
                            <ProgressChart
                                data={progressRingData}
                                width={chartWidth}
                                height={chartHeight}
                                strokeWidth={12}
                                radius={24}
                                chartConfig={styles.chartConfig}
                                hideLegend={false}
                                style={styles.chart}
                            />
                        </ScrollView> */}
                    </View>
                </View>
                <View  /*style={{backgroundColor: Colors.secondary.NON_PHOTO_BLUE}}*/>
                    <Text style={styles.header}>Recommended</Text>
                    {/* TODO: Add dim gradient when there's cards outside of view on both left and right sides */}
                    <ScrollView
                        horizontal
                        pagingEnabled
                        snapToInterval={windowWidth}
                        decelerationRate={0.8}
                        contentContainerStyle={styles.scrollViewContentContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title>Card Title</Card.Title>
                            <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </Card>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title>Card Title</Card.Title>
                            <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </Card>
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title>Card Title</Card.Title>
                            <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </Card>
                    </ScrollView>
                </View>
                <View>
                    <Text style={styles.header}>Rankings</Text>
                    {/* <View style={{height: windowHeight}}>

                    </View> */}
                </View>
            </ScrollView>
        </View>
    );
};