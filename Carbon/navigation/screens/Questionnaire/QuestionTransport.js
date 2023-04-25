import React, {useEffect} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';
/*
Transport Screen
TODO: Find a better way to transfer values to the last screen(instead of transferring between pages)
TODO: Improve UI
*/

export default function TransportScreen({navigation, route}) {

    //Carry Scores and values from previous pages
    const dietScore = route.params?.dietScore;
    const homePowerScore = route.params?.homePowerScore;
    const annualPower = route.params?.annualPower;

    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"42%",
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
                paddingLeft:"8%",
                paddingRight:"6%",
            }}>
            In 2020, passenger vehicles accounted for 38% of greenhouse
            gases emitted by the transportation industry. Do you own or drive
            a passenger vehicle?
            </Text>
            <View style={{
                width:"60%",
            }}
            >
            <View style={{
                marginBottom:12,
            }}>
            <Button
                title="Yes"
                onPress={()=>{
                    navigation.navigate("q4a",{
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    });
                }}
                color={Colors.secondary.LIGHT_MINT}
            />
            </View>
            <View style={{
                            marginBottom:12,
            }}>
            <Button
                title ="No"
                onPress={()=>{
                    navigation.navigate("q4c",{
                    dietScore:dietScore,
                    homePowerScore:homePowerScore,
                    annualPower:annualPower,
                    });
                }}
                color={Colors.secondary.LIGHT_MINT}
            />
            </View>
            </View>
            </View>
            <View style={{
                justifyContent:'center',
            }}>
            <Button
            title="Previous Question"
            color={Colors.primary.MINT}
            onPress={() =>
                navigation.goBack()
            }
            />
            </View>
            </>
        )
}