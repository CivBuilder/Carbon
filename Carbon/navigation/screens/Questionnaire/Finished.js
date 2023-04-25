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
            <Text>Transport Score: {route.params?.transportScore}</Text>
            <Text>Lifestyle Score: {route.params?.lifestyleScore}</Text>
            <Text>Food Score: {route.params?.foodScore}</Text>
            <Text>Home Score: {route.params?.homeScore}</Text>
            <Text>Awareness Score: {route.params?.awarenessScore}</Text>
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