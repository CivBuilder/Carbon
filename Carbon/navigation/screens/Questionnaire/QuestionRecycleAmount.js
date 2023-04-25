import React, {useState,useEffect} from 'react';
import {View, Text,Button,TextInput } from 'react-native';
import { Colors } from '../../../styling/Colors';
import {aveRecyclingPerWeek} from '../../../calculations/recycling_calculations/aveRecycling';
import mapScore from '../../../calculations/questionnaireMapScore';
/*
Mileage Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
*/

export default function RecycleAmountScreen({navigation,route}) {
    //Values from previous pages
    const homeScore = route.params?.homeScore;
    const [lifestyleScore,setLifestyleScore] = useState(route.params?.lifestyleScore);
    const foodScore = route.params?.foodScore;
    const transportScore= route.params?.transportScore;

    //Value to calculate & transfer at the "finished" screen
    const [recycleAmt,setRecycleAmt] = useState(0);

    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"95%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
    });

    const calculateRecycleAmount=() =>{
        //More recycling is better
        let userPerformance = recycleAmt/aveRecyclingPerWeek.average;
        setLifestyleScore(mapScore(userPerformance));
    }

    return (
    <>
    <View
    style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
    }}
    >
        <Text style={{
            fontSize:20,
            fontWeight:"400",
            marginBottom:40,
            paddingLeft:"6%",
            paddingRight:"6%",
        }}>
        (Optional) Approximately How many pounds of material do you recycle per week? Respond in pounds
        </Text>
        <View>
        <Text style={{
            fontSize: 20,
            fontWeight: "400",
            marginBottom: 5,
        }}> Recycle Amount </Text>
        <TextInput
        placeholder="Pounds (lbs) Ex: 3"
        style={{
        backgroundColor:Colors.secondary.NYANZA,
        height: 32,
        }}
        keyboardType="decimal-pad"
        onChangeText={text=>{
        setRecycleAmt(text);
        calculateRecycleAmount();
        }}
        />
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
                navigation.navigate('finished',{
                    transportScore:transportScore,
                    homeScore:homeScore,
                    foodScore:foodScore,
                    lifestyleScore:lifestyleScore,
                })
            }
            />
            </View>
            </View>
            </>
        )
}