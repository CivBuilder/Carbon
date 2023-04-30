import React from "react"
import { useState, useEffect } from 'react';
import { Colors } from "../../../styling/Colors";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import LoadingIndicator from "../../../components/LoadingIndicator";
import PredictInput from "../../../calculations/PredictInput";
import { ScreenNames } from "../Main/ScreenNames";
import { DailyLog } from "../../../components/ChartData";
import {API_URL} from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';

const windowHeight = Dimensions.get("window").height;
export default function PredictScreen({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null)
    const [emissionsEntry, setEmissionsEntry] = useState({
        transport_emissions: 0,
        total_emissions: 0,
        lifestyle_emissions: 0,
        diet_emissions: 0,
        home_emissions: 0
    });
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000 + Math.floor(Math.random() * 1000)); // 3 seconds

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);


    useEffect(() => {
        //Wait for get Data
        async function callPredictInput() {
            try {
                const retData = await PredictInput(); //put the data here and set the array
                setData(retData); //Sets the 2d array to be in twoDdata
              
            }
            catch (error) {
                console.log(error);
            }
        }
        callPredictInput(); //Call the getdata through callGetData
        
    }, []);

    async function postResults() {
        try {
            console.log("trying to post")
            setEmissionsEntry({
                transport_emissions: data[0],
                total_emissions: data[4],
                lifestyle_emissions: data[2],
                diet_emissions: data[1],
                home_emissions: data[3]
            });
            //post emission to server
            const response = await fetch(`${API_URL}userEmissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'secrettoken': await getToken(),
                },
                body: JSON.stringify(emissionsEntry)
            });
            //exit screen on successful request
            if (response.status === 200) {
                console.log("Successful Post!");
                navigation.goBack();
            }
            //if second post for the day - alert and also go back
            else if (response.status === 204) {
                alert(`You can only upload results once a day :(`);
                navigation.goBack();
            }
            //Alert on bad request - should only see on testing 
            else if (response.status === 404) {
                throw new Error(`Client ID Not Found`);
            }
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <View style={{ backgroundColor: '#F7FCF8 ' }}>
            {loading || !data ? (
                <View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: windowHeight / 4
                    }}>

                        <Text style={{
                            color: Colors.primary.MINT,
                            fontWeight: 'bold',
                            fontSize: 18
                        }}>Predicting Results</Text>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 20
                    }}>
                        <LoadingIndicator loading={loading} ></LoadingIndicator>
                    </View>
                </View>
            ) : (
    
                data.every((num) => num === 0) ? (
                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 16,
                        height: windowHeight - 100,
                        padding: 10,
                        marginHorizontal: 10,
                        marginVertical: 10
                    }}>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: windowHeight / 10
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: Colors.primary.MINT,
                                fontWeight: 'bold'
                            }}>Not enough data for an accurate prediction.</Text>
                            <TouchableOpacity testID="record-emission-button" onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION)}>
                                <View style={{
                                    backgroundColor: Colors.primary.MINT,
                                    padding: 10,
                                    marginTop: 12,
                                    borderRadius: 12
                                }}>
                                    <Text style={{
                                        color: Colors.primary.MINT_CREAM,
                                        fontWeight: 'bold',
                                        fontSize: 14
                                    }}>Add Emissions</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 16,
                        height: windowHeight - 100,
                        padding: 10, marginHorizontal: 10,
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            textAlign: 'center',

                            fontSize: 18,
                            color: Colors.primary.MINT,
                            fontWeight: 'bold'
                        }}>Here is your predicted data.</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <DailyLog dataArray={data}> </DailyLog>
                        </View>
                        <View style={{ padding: 10, justifyContent: 'center', flexDirection: 'row', alignSelf: "center" }} >
                            <TouchableOpacity style={{
                                backgroundColor: Colors.primary.MINT,
                                borderRadius: 5,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 10,
                            }} testID="accept-predict-button" onPress={() => navigation.goBack()}>

                                <Text style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 24 }}>Decline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: Colors.primary.MINT,
                                borderRadius: 5,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 10,
                            }} testID="accept-predict-button" onPress={() => postResults()}>
                                <Text style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 24 }}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )

            )}
        </View>
    )



}

