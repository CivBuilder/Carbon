import React, {useState,useEffect} from 'react';
import {View, Text,Button,Switch } from 'react-native';
import { Colors } from '../../../colors/Colors';

/*
Public Transport Screen

TODO: Improve UI
TODO: Improve transferring of data between pages
*/

export default function PublicTransportScreen({navigation,route}) {
    //Data transfered from previous pages
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;

    //Max score for public transport
    const maxPoints = 10.0;

    //"Select all that apply" state variables
    const [isDisabled,setIsDisabled] = useState(false);
    const [pointPercent,setPointPercent] = useState(0);
    const [buttonOn0, setButtonOn0] = useState(false);
    const [buttonOn1, setButtonOn1] =  useState(false);

    //Calculates score (scales from 0 to 1)
    const calculatePoints=() =>{
        let numerator = buttonOn0*6 + buttonOn1*10;
        let denominator = (buttonOn0+buttonOn1)*maxPoints;
        setPointPercent(previousState=>numerator/denominator);
    }
    //Ensure that points is synchronous
    useEffect(()=>{
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
            <Text>What form of transportation do you use?(Check All the Apply)</Text>
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="Public Transportation (Bus,Metro,etc...)"
                onPress={()=>{
                    toggleButton(0);
                }}
                color={buttonOn0 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Other (Bicycle,walking,etc...)"
                onPress={()=>{
                    toggleButton(1);
                }}
                color={buttonOn1 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
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
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    transportScore:pointPercent,
                    })
            }
            disabled ={(buttonOn0||buttonOn1) ? false: true}
            />
            </View>
            </View>
            </>
        )
}