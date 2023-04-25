import { View, Text, TouchableOpacity, StyleSheet, Pressable, Dimensions} from "react-native";
import { DailyLog } from "../../../components/ChartData";
import React, { useState, useEffect } from 'react';
import { Colors } from '../../../colors/Colors';
import GetData from "./GetData";
import { ScreenNames } from '../Main/ScreenNames';

import PredictInput from "../../../calculations/PredictInput.js";
const windowHeight = Dimensions.get("window").height;

/*
    Log function, it can get todays, yesterdays, weekly or monthly data
    It's purpose is to display to the user their relevant data in an easy to see way and let them track their progress
    Currently nothing is passed in or returned except the component itself
*/



export default function Log({ navigation }) {
    PredictInput();
    const whichLog = ["Today's", "Yesterday's", "Weekly", "Monthly"]; //String list for displaying
    const [number, setNumber] = useState(0);  //A state hook to set which area we are time frame we look at. 
    //0 = "Today", 1= "Yesterday's" etc etc.
    const [twoDdata, loadArr] = useState(null);
    const [data, setArray] = useState(null);
    //Get our data from getData This will effectively 
    useEffect(() => {
        //Wait for get Data
        async function callGetData() {
            try {
                const retData = await GetData(); //put the data here and set the array
                loadArr(retData); //Sets the 2d array to be in twoDdata
                setArray(retData[0]); //as well as setting the specific look at to be index 0
            }
            catch (error) {
                console.log(error);
            }
        }
        callGetData(); //Call the getdata through callGetData
    }, []);
    if (!data) {
        //ESSENTIALLY if it isnt loaded we return null
        return (
            <View style={{  backgroundColor: "white",  borderRadius: 16, height: windowHeight / 2, padding: 10 }} >
            <Text style={{ fontSize: 40 }}>LOADING......</Text> 
            </View>
            )
    }
    //function to handle the change to the right (aka today -> yesterday)
    const handleChangeRight = () => {
        if (number < 3) {
            setNumber(number + 1);
        }
        changeArrayRight();
    };
    //function to handle the change to the right (aka yesterday -> today)

    const handleChangeLeft = () => {
        if (number > 0) {
            setNumber(number - 1);
        }
        changeArrayLeft();
    };

    //change array functions update the displayed data as according
    const changeArrayLeft = () => {
        if (number > 0) {
            setArray(twoDdata[number - 1]);
        }
    };
    const changeArrayRight = () => {
        if (number < 3) {
            setArray(twoDdata[number + 1]);
        }
    };
    //our rendering
    return (
        <View style={{  backgroundColor: "white",  borderRadius: 16, height: windowHeight / 2, padding: 10 }}> 
            <View style={styles.header}>

                <Text style={styles.title}>{whichLog[number]} Log</Text>
                {/* Will display the log as well as some text next to it*/}

                <Text>Units: lb's CO2</Text>
                {/* Displays our units used */}

            </View>
            {/*Align things */}

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15,/*backgroundColor: Colors.primary.MINT*/ }}>
                {/* Implements the log itself from ChartData.js */}
                {data.every((num) => num === 0) ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: windowHeight / 10}}>
                                <Text style={{ fontSize: 18 }}>Not enough data for {whichLog[number]} log.</Text>
                                <TouchableOpacity testID="record-emission-button" onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION)}>
                                    <View style={{ backgroundColor: Colors.primary.MINT, padding: 10, marginTop: 12, borderRadius: 12 }}>
                                        <Text style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 14 }}>Add Emissions</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                
                   
                ) : (
                    <DailyLog dataArray={data}></DailyLog>
                )}
                {/*Additional formatting for the button */}
            </View>

            <View style={{ padding: 10, bottom: 0, position: 'absolute', justifyContent: 'center', flexDirection: 'row', alignSelf: "center" }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.primary.MINT,
                        borderRadius: 5,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: margin,
                    }}
                    testID="left-click"

                    onPress={handleChangeLeft}
                >{/* handle left*/}
                    {/* More formatting*/}
                    <Text style={{ color: 'white', fontSize: 26 }}>{' <-'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    testID="right-click"
                    style={{
                        backgroundColor: Colors.primary.MINT,
                        borderRadius: 5,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: margin,
                    }}
                    onPress={handleChangeRight}
                >{/* Handle right*/}
                    {/* more button formatting*/}
                    <Text style={{ justifyContent: 'center', color: 'white', fontSize: 26 }}>{' ->'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const margin = 10;
//Style sheet for formating
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