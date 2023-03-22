import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DailyLog } from "../../../components/ChartData";
import React, { useState } from 'react';
import { Colors } from '../../../colors/Colors';
import  GetData  from "./GetData";
const twoDarray = [[100, 200, 300, 400, 500],[500, 545, 100, 555, 100],[100, 200, 300, 400, 500],[800, 200, 750, 600, 500]]; //Temp array for data
//GetData() //calls the get data function

/*
    Log function, it can get todays, yesterdays, weekly or monthly data
    It's purpose is to display to the user their relevant data in an easy to see way and let them track their progress
    Currently nothing is passed in or returned except the component itself
*/
export default function Log() {
    const whichLog = ["Today's", "Yesterday's", "Weekly", "Monthly"]; //String list for displaying

    const [number, setNumber] = useState(0);  //A state hook to set which area we are time frame we look at. 
                                              //0 = "Today", 1= "Yesterday's" etc etc.
    const [data, setArray] = useState(twoDarray[0]); //This will set the array corresponding with the time frame like above. Both default to "today"
    
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
    //our rendering
    return (
        <View>
            <View style={styles.header}> 

                <Text style={styles.title}>{whichLog[number]} Log</Text> 
                {/* Will display the log as well as some text next to it*/}
                
                <Text>Units: lb CO2e</Text> 
                {/* Displays our units used */}

            </View>
            {/*Align things */}

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15,/*backgroundColor: Colors.primary.MINT*/ }}>
                 {/* Implements the log itself from ChartData.js */}
                <DailyLog dataArray = {data}></DailyLog> 
                     
                {/*Additional formatting for the button */}
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
                    >{/* handle left*/}
                    {/* More formatting*/}
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
