import React,{useEffect} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';
/*
Finished Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
TODO: Connect finished to signup page(?)
*/

export default function FinishedScreen({navigation,route}) {
    //Values from previous pages
    const dietScore = 0;
    const homePowerScore = 0;
    const annualPower = 0;
    const transportScore=0;
    const miles = 0;


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