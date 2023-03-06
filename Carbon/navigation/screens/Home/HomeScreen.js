import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import { Colors } from '../../../colors/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { CarbonFootprint, DailyLog } from './ChartData';

// =====================
//     Home Screen
// =====================
export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                {/******* CARBON FOOTPRINT SUMMARY *******/}
                <View>
                    <View style={styles.marginContainer}>
                        <View style={styles.headerContainer}>
                            <View>
                                <Text style={styles.headerTitle}>This Month's Footprint</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.PROGRESS)}>
                                <Text style={styles.link}>See More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text>TODO: Add carbon footprint chart here</Text>
                        </View>
                    </View>
                </View>

                {/******* TODAY'S LOG *******/}
                <View style={{height: windowHeight/4, /*backgroundColor: Colors.primary.MINT*/}}>
                    <View style={styles.marginContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTitle}>Today's Log</Text>
                        </View>
                        <View>
                            <Text>TODO: Add Today's Daily Log</Text>
                            <Text>TODO: Add a + button</Text>
                        </View>
                    </View>
                </View>

                {/******* FOR YOU *******/}
                <View>
                    <View style={{...styles.headerContainer, horizontalMargin: horizontalMargin / 2}}>
                        <Text style={{...styles.headerTitle, marginLeft: horizontalMargin / 2}}>For You</Text>
                    </View>
                    {/* TODO: Add dim gradient when there's cards outside of view on both left and right sides */}
                    {/* TODO: Add pagination dots*/}
                    <ScrollView
                        horizontal
                        pagingEnabled
                        snapToInterval={windowWidth}
                        decelerationRate={0.8}
                        contentContainerStyle={styles.cardScrollViewContentContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                            <Card containerStyle={styles.cardContainer}>
                                <Card.Title>Card Title 1</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={styles.cardContainer}>
                                <Card.Title>Card Title 2</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={styles.cardContainer}>
                                <Card.Title>Card Title 3</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={styles.cardContainer}>
                                <Card.Title>Card Title 4</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                            <Card containerStyle={styles.cardContainer}>
                                <Card.Title>Card Title 5</Card.Title>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                            </Card>
                    </ScrollView>
                </View>

                {/******* RANKINGS *******/}
                <View style={{height: windowHeight/4, /*backgroundColor: Colors.primary.MINT*/}}>
                    <View style={styles.marginContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTitle}>Rankings</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const horizontalMargin = 20;

const styles = StyleSheet.create({
    headerTitle: {
        marginTop: 10,
        // marginLeft: horizontalMargin / 2,
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardContainer: {
        width: windowWidth / 2.25,
        height: windowHeight / 2.5,
        borderRadius: 12,
        marginHorizontal: horizontalMargin/2,
        marginBottom: 20,
    },
    cardScrollViewContentContainer: {
        marginBottom: 10,
    },
    marginContainer: {
        marginHorizontal: horizontalMargin / 2
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    link: {
        color: Colors.primary.MINT,
        fontSize: 14,
    }
});