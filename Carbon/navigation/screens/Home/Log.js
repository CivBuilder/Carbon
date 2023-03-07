import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { styles } from "./HomeScreen";
import { DailyLog } from "./ChartData";
import React, { useState } from 'react';
import { Button } from "react-native-elements";
import { Colors } from '../../../colors/Colors';

export default function Log() {
    const whichLog = ["Today's", "Yesterday's", "Weekly", "Monthly"];
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const horizontalMargin = 20;
    const [number, setNumber] = useState(0);
    const handleChangeRight = () => {
        if (number < 3) {
            setNumber(number + 1);
        }
    };
    const handleChangeLeft = () => {
        if (number > 0) {
            setNumber(number - 1);
        }
    };
    return (

        <View style={{ height: windowHeight / 2, /*backgroundColor: Colors.primary.MINT*/ }}>
            <View style={styles.marginContainer}>
                <View style={styles.headerContainer}>

                    <Text style={styles.headerTitle}>{whichLog[number]} Log</Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15,/*backgroundColor: Colors.primary.MINT*/ }}>
                    <DailyLog></DailyLog>
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
