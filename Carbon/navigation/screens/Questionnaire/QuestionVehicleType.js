import React, {useState,useEffect} from 'react';
import {View, Text,Button } from 'react-native';
import { Colors } from '../../../styling/Colors';/*
Vehicle Type Screen

TODO: Improve UI
TODO: Better handling of previous page values
TODO: Better handling of max points per question
*/


export default function VehicleTypeScreen({navigation,route}) {

    //Transferred Scores from previous pages
    const foodScore = route.params?.foodScore;
    const homeScore= route.params?.homeScore;
    const [transportScore,setTransportScore] = useState(0);

    //Single Choice Question, so we only need one button value
    const [buttonIndex, setButtonIndex] = useState(-1);

    //Change page depending on the answer:
    const [nextPage,setNextPage] = useState("q4b");

    //Changes the button index for UI/points change
    const changeIndex=(index)=>{
        setButtonIndex(previousState=>index);
    }
    const  calculateTransportScore = 0;
    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"62%",
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
            <Text style={{
                fontSize:20,
                fontWeight:"400",
                marginBottom:40,
            }}>What type of vehicle do you own?</Text>
            <View style={{
                width:"60%",
            }}
            >
            <View style={{
                marginBottom:20,
            }}
            >
            <Button
                title="Gas-Based"
                onPress={()=>{
                setButtonIndex(0);
                setNextPage("q4b");
                }}
                color={buttonIndex==0 ? Colors.primary.MINT: Colors.primary.GRAY}
            />
            </View>
            <View style={{
                marginBottom:20,
            }}
            >
            <Button
                title ="Diesel-Based"
                onPress={()=>{
                setButtonIndex(1);
                setNextPage("q4b");
                }}
                color={buttonIndex==1 ? Colors.primary.MINT: Colors.primary.GRAY}
            />
            </View>
            <View style={{
                marginBottom:20,
            }}
            >
            <Button
                title="Electric"
                onPress={()=>{
                setButtonIndex(2);
                setNextPage("q5");

                }}
                color={buttonIndex==2 ? Colors.primary.MINT: Colors.primary.GRAY}
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
            title="Previous"
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
                navigation.navigate(nextPage,{
                })
            }
            disabled ={buttonIndex>=0 ? false: true}
            />
            </View>
            </View>
            </>
        )
}