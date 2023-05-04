import React from "react"
import { useState, useEffect } from 'react';
import { Colors } from "../../../styling/Colors";
import { View, Text, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, Image, ActivityIndicator } from "react-native";
import PredictInput from "../../../calculations/PredictInput";
import { ScreenNames } from "../Main/ScreenNames";
import { DailyLog } from "../../../components/ChartData";
import { API_URL } from '../../../config/Api';
import { getToken } from "../../../util/UserManagement";
import { q_styles } from "../Questionnaire/QuestionnaireStyle";
import LottieView from 'lottie-react-native';
import { useToast } from 'react-native-toast-notifications';

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

    const toast = useToast();
    const [predictSet, setPredictSet] = useState(false);
    useEffect(() => {
        if (predictSet) {
            toast.show('Your emissions have been logged!', {
                type: 'success',
            });
        }
    }, [predictSet]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 6000 + Math.floor(Math.random() * 1000)); // 3 seconds

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
            // console.log("trying to post")
            const predictedEmissions = {
                transport_emissions: data[0],
                total_emissions: data[4],
                lifestyle_emissions: data[2],
                diet_emissions: data[1],
                home_emissions: data[3]
            };
            //post emission to server
            const response = await fetch(API_URL + 'userEmissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'secrettoken': await getToken(),
                },
                body: JSON.stringify(predictedEmissions)
            });

            //exit screen on successful request
            if (response.status === 200) {
                // console.log("Successful Post!");
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
        <ImageBackground
            source={require('../../../assets/get-started-background.png')}
            style={q_styles.background}
        >
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>

                {loading || !data ? (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                color: Colors.primary.MINT,
                                fontWeight: '500',
                                fontSize: 24,
                                textAlign: 'center',
                                marginBottom: -50
                            }}>Predicting Results...</Text>
                        </View>

                        <LottieView speed={2} style={{ height: 280, marginHorizontal: 8 }} source={require('../../../assets/lotties/tinytown.json')} autoPlay loop />

                    </View>
                ) : (

                    data.every((num) => num === 0) ? (

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
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
                    ) : (
                        <View style={{
                            borderRadius: 16,
                            padding: 10,
                            margin: 10,
                        }}>
                            <Text style={{
                                textAlign: 'center',

                                fontSize: 18,
                                color: Colors.primary.MINT,
                                fontWeight: 'bold'
                            }}>Here is your predicted daily emission for today (in lbs CO{`\u2082`}).</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                <DailyLog dataArray={data}> </DailyLog>
                            </View>
                            <View style={{ padding: 10, justifyContent: 'center', flexDirection: 'row', alignSelf: "center" }} >
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 12,
                                        borderWidth: 2,
                                        borderColor: '#db2525',
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 10,
                                        padding:6,
                                    }}
                                    testID="reject-predict-button"
                                    onPress={() =>{ navigation.goBack() }}>

                                    <Text style={{ color: '#db2525', fontWeight: '500', fontSize: 18, letterSpacing:.8, }}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: Colors.primary.MINT,
                                        borderRadius: 12,
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 10,
                                        padding:6,
                                    }}
                                    testID="accept-predict-button"
                                    onPress={async () => {
                                        await postResults();
                                        setPredictSet(true);
                                        navigation.goBack();
                                    }}
                                >
                                    <Text style={{ color: Colors.primary.MINT_CREAM, fontWeight: '500', fontSize: 18, letterSpacing:.8, }}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )

                )}
            </SafeAreaView>

        </ImageBackground>
    )



}
const LoadingIndicatorStyle = {
    marginTop: 10,
    alignItems: 'center',
}