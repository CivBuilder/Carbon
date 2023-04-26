import React,{useEffect} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { API_URL } from '../../../config/Api';
import { getToken } from '../../../util/LoginManager';

/*
Finished Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
TODO: Connect finished to signup page(?)
*/

const finishedQuestionnaire = async () => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'secrettoken': await getToken(),
        }
    };

    try {
        const response = await fetch(API_URL + 'user/finish-questionnaire/', requestOptions);
        // console.log(JSON.stringify(response));
        if (response.status === 200) {
            console.log("Finished Questionnaire");
        } else {
            console.log("Failed to finish questionnaire");
        }
    } catch (error) {
        console.error(error);
    }
};

export default function FinishedScreen({navigation,route}) {
    //Values from previous pages
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;
    const transportScore=route.params?.transportScore;
    const miles = (route.params?.miles) ? route.params?.miles : 0;


    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
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
            <Text>Transport Score: {transportScore}</Text>
            <Text>Lifestyle Score: {lifestyleScore}</Text>
            <Text>Food Score: {foodScore}</Text>
            <Text>Home Score: {homeScore}</Text>
            <Text>Awareness Score: {awarenessScore}</Text>
            </View>
            <View style={{
                flex:0,
                justifyContent:'center',
            }}>
            <Button
            title="Exit"
            color={Colors.primary.MINT}
            onPress={() => {
                //TODO: Need to add relevant data to confirm questionnaire AND handle data in Main Container function
                    route.params.confirmQuestionnaire(true)
                    finishedQuestionnaire()
                    navigation.navigate('Home')
            }}
            />
            </View>
            </>
        )
}