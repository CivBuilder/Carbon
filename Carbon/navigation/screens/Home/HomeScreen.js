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
        <SafeAreaView style={{/*height:a windowHeight*/}}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                {/******* CARBON FOOTPRINT SUMMARY *******/}
                <View>
                    <View styles={styles.headerContainer}>
                        <View>
                            <Text style={styles.headerTitle}>This Month's Footprint</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.PROGRESS)}>
                                {/* TODO: Move this to the right side of the header */}
                                <Text style={styles.link}>See More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <CarbonFootprint />
                    </View>
                </View>

                {/******* TODAY'S LOG *******/}
                <View style={{height: windowHeight/4, backgroundColor: Colors.primary.MINT}}>
                    <Text style={styles.headerTitle}>Today's Log</Text>
                    <View><DailyLog/></View>
                </View>

                {/******* FOR YOU *******/}
                <View  /*style={{backgroundColor: Colors.secondary.NON_PHOTO_BLUE}}*/>
                    <Text style={styles.headerTitle}>For You</Text>
                    {/* TODO: Add dim gradient when there's cards outside of view on both left and right sides */}
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
                    </ScrollView>
                </View>

                {/******* RANKINGS *******/}
                <View style={{height: windowHeight/4, backgroundColor: Colors.primary.MINT}}>
                    <Text style={styles.headerTitle}>Rankings</Text>
                    <View></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const horizontalMargin = 20;

const styles = StyleSheet.create({
    // title: {
    //     marginTop: 10,
    //     marginLeft: horizontalMargin / 4,
    //     fontSize: 25,
    //     fontWeight: 'bold'a
    // },
    headerTitle: {
        marginTop: 10,
        marginLeft: horizontalMargin / 2,
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        color: Colors.primary.MINT,
        fontSize: 14,
        textDecorationLine: 'underline',
    }
});