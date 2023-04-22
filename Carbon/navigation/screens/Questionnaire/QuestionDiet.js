import {useState,useEffect} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';

/*
Question 1 Screen

TODO: Update UI
*/

export default function DietScreen({navigation}) {
    useEffect(()=>{
            navigation.setOptions({
            header: ()=>(
                <View style={{
                position: "absolute",
                top:0,
                height:40,
                borderRadius: 6,
                width:"14.3%",
                backgroundColor: Colors.secondary.CELADON,
                }}>
                </View>
            ),
            })
    });

    //Maximum points -- Can be set to a different value
    const maxPoints = 10.0;


    const [isDisabled,setIsDisabled] = useState(false);
    const [pointPercent,setPointPercent] = useState(0);
    const [buttonIndex, setButtonIndex] = useState(-1);

    //Changes the color based on the buttonIndex (Only useful for single-choice questions)
    const changeIndex=(index)=>{
        setButtonIndex(previousState=>index);
    }

    //Prevent user from moving on until they press a button,
    //then calculate the score (equal to points/maxPoints)
    const disableButton=(points)=> {
            setIsDisabled(previousState=>true);
            setPointPercent(previousState=>points/maxPoints);
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
            <Text>What is your diet?</Text>
            <View style={{
                width:"100%",
            }}
            >
            <Button
                title="No Restrictions"
                onPress={()=>{
                disableButton(3);
                setButtonIndex(0);
                }}
                color={buttonIndex==0 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Pescatarian"
                onPress={()=>{
                disableButton(4);
                setButtonIndex(1);
                }}
                color={buttonIndex==1 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title="Vegetarian"
                onPress={()=>{
                disableButton(6);
                setButtonIndex(2);
                }}
                color={buttonIndex==2 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            <Button
                title ="Vegan/Plant-Based"
                onPress={()=>{
                disableButton(10);
                setButtonIndex(3);
                }}
                color={buttonIndex==3 ? Colors.primary.RAISIN_BLACK: Colors.secondary.LIGHT_MINT}
            />
            </View>
            </View>
            <View style={{
                justifyContent:'center',
                flexDirection:"row",
            }}>
            <View style={{width:'50%'}}>
            <Button
            title="Return to Start"
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
                navigation.navigate('q2',{dietScore:pointPercent})
            }
            disabled ={isDisabled ? false: true}
            />
            </View>
            </View>
            </>
        )
}