import React,{useEffect} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { API_URL } from '../../../config/Api';
import { getAuthHeader } from '../../../util/LoginManager';

/*
Finished Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
TODO: Connect finished to signup page(?)
*/

const finishedQuestionnaire = async () => {
    try {
        const url = API_URL + '/user/finish-questionnaire/';
        const response = await fetch(url, getAuthHeader());
        const result = await response.json();
        //stringify json
        console.log(JSON.stringify(result));
    } catch (error) {

    }
}

export default function FinishedScreen({navigation,route}) {
    //Values from previous pages
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;
    const transportScore=route.params?.transportScore;
    const miles = (route.params?.miles) ? route.params?.miles : 0;


    //Final scores!!
    const transScore = (miles!=0) ? transportScore*miles/200000: transportScore;
    const powerScore = annualPower/10632;
    const foodScore = dietScore;
    const homeScore = homePowerScore;
    const awarenessScore= (miles!=0) ? transportScore*miles/200000: transportScore

    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:40,
        borderRadius: 6,
        width:"100%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
    });

    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>
            Final Data:
            </Text>
            <Text>Transport Score: {transScore}</Text>
            <Text>Lifestyle Score: {powerScore}</Text>
            <Text>Food Score: {dietScore}</Text>
            <Text>Home Score: {homePowerScore}</Text>
            <Text>Awareness Score: {transScore}</Text>
            </View>
            <View style={{
                flex:0,
                justifyContent:'center',
            }}>
            <Button
            title="Signup or Login"
            color={Colors.primary.MINT}
            onPress={() =>
                //TODO: Need to add relevant data to confirm questionnaire AND handle data in Main Container function
                route.params.confirmQuestionnaire(true)
            }
            />
            </View>
            </>
        )
}