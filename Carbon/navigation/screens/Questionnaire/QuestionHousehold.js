import React, {useState,useEffect} from 'react';
import {View, Text,Switch,Button} from 'react-native';
import { Colors } from '../../../colors/Colors';

/*
Household Screen
TODO: Managing scores in a better way (instead of passing them through pages)
TODO: using less state variables
TODO: Improving UI
*/

export default function HouseholdScreen({navigation,route}) {
    //Carry Over Score from previous page
    const dietScore = route.params?.dietScore;
    const maxPoints = 10.0;

    const [isDisabled,setIsDisabled] = useState(false);//Activates "Next Question" Button
    const [pointPercent,setPointPercent] = useState(0);//Calculate points

    //Use Multiple Buttons to change colors/values activated.
    const [buttonOn0, setButtonOn0] = useState(false);
    const [buttonOn1, setButtonOn1] =  useState(false);
    const [buttonOn2, setButtonOn2] = useState(false);
    const [buttonOn3, setButtonOn3] = useState(false);

    //Calculate points across several buttons (For CHECK ALL THAT APPLY choice only)
    const calculatePoints=() =>{
        let numerator = buttonOn0*1 + buttonOn1*2 + buttonOn2*3 + buttonOn3*10;
        let denominator = (buttonOn0+buttonOn1+buttonOn2+buttonOn3)*maxPoints;
        setPointPercent(previousState=>numerator/denominator);
    }
    //Ensure points are synchronous & updating progress bar
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:40,
        borderRadius: 6,
        width:"28%",
        backgroundColor: Colors.secondary.CELADON,
        }}>
        </View>
        ),
        })
        calculatePoints();
    });

    const toggleButton = (index) => {
        const flip = false;
        //Toggle specific button depending on input
        switch(index){
            case 0:
                setButtonOn0(!buttonOn0);
                break;
            case 1:
                setButtonOn1(!buttonOn1);
                break;
            case 2:
                setButtonOn2(!buttonOn2);
                break;
            case 3:
                setButtonOn3(!buttonOn3);
                break;
            default:
                break;
        }
    }

    return (
            <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
            <Text>How is your household powered?(Check All the Apply)</Text>
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="Coal"
                onPress={()=>{
                    toggleButton(0);
                }}
                color={buttonOn0 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Petroleum"
                onPress={()=>{
                    toggleButton(1);
                }}
                color={buttonOn1 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title="Natural Gas"
                onPress={()=>{
                    toggleButton(2);
                }}
                color={buttonOn2 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Renewable Energy (Solar, Wind, etc...)"
                onPress={()=>{
                    toggleButton(3);
                }}
                color={buttonOn3 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
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
                navigation.navigate('q3',{dietScore:dietScore,
                powerSourceScore:pointPercent,
                })
            }
            disabled ={(buttonOn0||buttonOn1||buttonOn2||buttonOn3) ? false: true}
            />
            </View>
            </View>
            </>
        )
}