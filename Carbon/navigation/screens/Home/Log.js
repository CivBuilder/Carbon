import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DailyLog } from "../../../components/ChartData";
import React, { useState, useEffect } from 'react';
import { Colors } from '../../../styling/Colors';
import GetData from "./GetData";
/*
    Log function, it can get todays, yesterdays, weekly or monthly data
    It's purpose is to display to the user their relevant data in an easy to see way and let them track their progress
    Currently nothing is passed in or returned except the component itself
*/



export default function Log() {
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
        return (
            <Text style={{ fontSize: 40 }}>LOADING......</Text> //ESSENTIALLY if it isnt loaded we return null
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
        <View>
            <View style={styles.header}>

                <Text style={styles.title}>{whichLog[number]} Log</Text>
                {/* Will display the log as well as some text next to it*/}

                <Text>Units: lb's CO2e</Text>
                {/* Displays our units used */}

            </View>
            {/*Align things */}

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15,/*backgroundColor: Colors.primary.MINT*/ }}>
                {/* Implements the log itself from ChartData.js */}
                {data.every((num) => num === 0) ? (
                    <Text style={{ fontSize: 32 }} >ERROR, not enough data for {whichLog[number]} log.
                    Please click left or right.</Text>
                ) :(
                    <DailyLog dataArray={data}></DailyLog>
                )}
                {/*Additional formatting for the button */}
                <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primary.MINT,
                            borderRadius: 5,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: margin,
                        }}
                        testID = "left-click"

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