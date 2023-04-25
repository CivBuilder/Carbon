import React,{useEffect} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';
import { API_URL } from '../../../config/Api';

/*
Finished Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
TODO: Connect finished to signup page(?)
*/

export default function FinishedScreen({navigation, route}) {
    //Final Calculations
    const transportScore = route.params?.transportScore;
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const lifestyleScore = route.params?.lifestyleScore;
    const awarenessScore = (transportScore+foodScore+homeScore+lifestyleScore)/4;


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
            title="Go to Home!"
            color={Colors.primary.MINT}
            onPress={() =>{
                route.params?.confirmQuestionnaire(true)
            }}
            />
            </View>
            </>
        )
}