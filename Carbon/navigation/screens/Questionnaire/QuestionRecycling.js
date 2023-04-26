import React, {useEffect, useState} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';
/*
Transport Screen
TODO: Find a better way to transfer values to the last screen(instead of transferring between pages)
TODO: Improve UI
*/

export default function RecycleScreen({navigation, route}) {
    const foodScore = route.params?.foodScore;
    const homeScore = route.params?.homeScore;
    const transportScore = route.params?.transportScore;
    const [lifestyleScore, setLifestyleScore] = useState(0);
    //Updating progress bar (a.k.a the header)
    useEffect(()=>{
        navigation.setOptions({
        header: ()=>(
        <View style={{
        position: "absolute",
        top:0,
        height:30,
        borderRadius: 6,
        width:"80%",
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
                    backgroundColor: Colors.secondary.LIGHT_GREEN,
                }}
            >
            <Text style={{
                fontSize:20,
                fontWeight:"400",
                marginBottom:40,
                paddingLeft:"8%",
                paddingRight:"6%",
            }}>
            Do you recycle?
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
                    navigation.navigate("q5a",{
                    foodScore:foodScore,
                    transportScore:transportScore,
                    homeScore:homeScore,
                    lifestyleScore:lifestyleScore,
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
                    navigation.navigate("finished",{
                        foodScore:foodScore,
                        transportScore:transportScore,
                        homeScore:homeScore,
                        lifestyleScore:lifestyleScore,
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