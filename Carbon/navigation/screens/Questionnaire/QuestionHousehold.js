import React, {useState,useEffect} from 'react';
import {View, Text,Switch,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';

/*
Household Screen
TODO: Improving UI
*/

export default function HouseholdScreen({navigation,route}) {
    //Previous food score calculation [0,1]
    const foodScore = route.params?.foodScore;
    const[homeScore, setHomeScore] = useState(0);

    const [nextPage, setNextPage] = useState("q4")
    const [buttonIndex, setButtonIndex] = useState(-1)

    //Calculate points across several buttons (For CHECK ALL THAT APPLY choice only)
    const calculatePoints=() =>{
        //Solely Renewable energy has no carbon emissions:
        if(buttonIndex==1){
            setHomeScore(1);
        }
        //Score is determined by bills page, keep it at 0!
        else{
            setHomeScore(0);
        }
    }
    //Ensure points are synchronous & updating progress bar
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"20%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
        calculatePoints();
    });

    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.secondary.LIGHT_GREEN,
                }}
            >
            <Text style={{
                fontSize:20,
                fontWeight:"400",
                marginBottom: 40,
                textAlign:"center",
            }}>
            How is your household powered?
            </Text>
            <View style={{
                width:"60%",
            }}
            >
            <View style={{
                marginBottom:12,
            }}
            >
            <Button
                title={`Fossil Fuels\n(Coal, Natural Gas, etc...)`}
                onPress={()=>{
                    setButtonIndex(0)
                    setNextPage("q2a")
                }}
                color={buttonIndex==0 ? Colors.primary.MINT: Colors.primary.GRAY}
            />
            </View>
            <View style={{
                marginBottom:12,
            }}
            >
            <Button
                title ={`Renewable Energy \n(Solar, Wind, etc...)`}
                onPress={()=>{
                    setButtonIndex(1)
                    setNextPage("q4")
                }}
                color={buttonIndex==1 ? Colors.primary.MINT: Colors.primary.GRAY}
            />
            </View>
            </View>
            </View>
            <View style={{
                justifyContent:'center',
                flexDirection:"row",
            }}>
            <View style={{width:'50%'}}>
            <Button
            title="Previous Question"
            color={Colors.primary.MINT}
            onPress={() =>
                navigation.goBack()
            }
            />
            </View>
            <View style={{width:'50%'}}>
            <Button
            title="Next Question"
            color={Colors.primary.MINT}
            onPress={() =>
                navigation.navigate(nextPage, {
                homeScore:homeScore,
                foodScore:foodScore,
                })
            }
            disabled ={buttonIndex>=0 ? false: true}
            />
            </View>
            </View>
            </>
        )
}