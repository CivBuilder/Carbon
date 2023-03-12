import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DailyLog } from "./ChartData";
import React, { useState } from 'react';
import { Colors } from '../../../colors/Colors';
import { GetData } from "./GetData";

export default function Log() {
    const whichLog = ["Today's", "Yesterday's", "Weekly", "Monthly"];

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
        <View>
            <View style={styles.header}>

                <Text style={styles.title}>{whichLog[number]} Log</Text>
                <Text>Units: lb CO2e</Text>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15,/*backgroundColor: Colors.primary.MINT*/ }}>
                <DailyLog dataArray = {data}></DailyLog>
                <View style={{ justifyContent: 'center', flexDirection: 'row',}}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primary.MINT,
                            borderRadius: 5,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: margin,
                        }}
                        onPress={handleChangeLeft}
                    >
                        <Text style={{ color: 'white', fontSize: 26 }}>{' <-'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primary.MINT,
                            borderRadius: 5,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: margin,
                        }}
                        onPress={handleChangeRight}
                    >
                        <Text style={{ justifyContent: 'center', color: 'white', fontSize: 26 }}>{' ->'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const margin = 10;
const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        margin: margin,
        backgroundColor: "white",
        borderRadius: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: 10,
    },
});