import { View, Dimensions, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DailyLog } from "./ChartData";
import React, { useState } from 'react';
import { Button } from "react-native-elements";
import { Colors } from '../../../colors/Colors';
import { GetData } from "./GetData";
export default function Log() {
    const whichLog = ["Today's", "Yesterday's", "Weekly", "Monthly"];
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const horizontalMargin = 20;
    const twoDarray =  GetData();
    const [number, setNumber] = useState(0);
    const [data, setArray] = useState(twoDarray[0]);
    const handleChangeRight = () => {
        if (number < 3) {
            setNumber(number + 1);
        }
        changeArrayRight();
    };
    const handleChangeLeft = () => {
        if (number > 0) {
            setNumber(number - 1);
        
        }
        changeArrayLeft();
    };

    const changeArrayLeft = () =>
    {
        if (number > 0)
        {
            setArray(twoDarray[number-1]);
        }
    };
    const changeArrayRight = () =>
    {
        if (number < 3) {
            setArray(twoDarray[number+1]);
        }
    };
    return (

        <View style={{ height: windowHeight / 2, /*backgroundColor: Colors.primary.MINT*/ }}>
            <View style={styles.marginContainer}>
                <View style={styles.headerContainer}>

                    <Text style={styles.headerTitle}>{whichLog[number]} Log</Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15,/*backgroundColor: Colors.primary.MINT*/ }}>
                    <DailyLog dataArray = {data}></DailyLog>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15, marginLeft: 10 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.primary.MINT,
                                padding: 10, borderRadius: 5,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                            }}
                            onPress={handleChangeLeft}
                        >
                            <Text style={{ color: 'white', fontSize: 26 }}>{' <-'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.primary.MINT,
                                padding: 10, borderRadius: 5,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                            }}
                            onPress={handleChangeRight}
                        >
                            <Text style={{ justifyContent: 'center', color: 'white', fontSize: 26 }}>{' ->'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}
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