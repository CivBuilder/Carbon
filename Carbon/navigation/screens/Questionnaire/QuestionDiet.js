import {useState,useEffect} from 'react';
import {View, Text,Button} from 'react-native';
import { Colors } from '../../../styling/Colors';

/*
Question 1 Screen
*/

export default function DietScreen({navigation}) {
    //Manages progress bar
    useEffect(()=>{
            navigation.setOptions({
            header: ()=>(
                <View style={{
                position: "absolute",
                top:0,
                height:40,
                borderRadius: 6,
                width:0,
                backgroundColor: Colors.secondary.CELADON,
                }}>
                </View>
            ),
            });

            setFoodScoreCalc(nextPage=="q2" ? 1: 0)
    });

    //Disables "next" button
    const [isDisabled,setIsDisabled] = useState(false);
    //Changes button colors based on index
    const [buttonIndex, setButtonIndex] = useState(-1);
    //Set next page depending on button pressed:
    const [nextPage,setNextPage] = useState("q2");
    //Calculate food Score on temp variable
    const [foodScoreCalc,setFoodScoreCalc] = useState(0);

    //Changes the color based on the buttonIndex (Only useful for single-choice questions)
    const changeIndex=(index)=>{
        setButtonIndex(previousState=>index);
    }

    //Prevent user from moving on until they press a button,
    //then calculate the score (equal to points/maxPoints)
    const disableButton=(points)=> {
            setIsDisabled(previousState=>true);
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
            <Text style={{
                fontSize:20,
                fontWeight:"400",
                marginBottom:40,
            }}
            > What is your diet?</Text>

            <View style={{
                width:"60%",
            }}
            >
            <View style={{
                marginBottom:12,
            }}>
            <Button
                title="No Restrictions"
                onPress={()=>{
                disableButton(3);
                setButtonIndex(0);
                setNextPage("q1a");
                }}
                color={buttonIndex==0 ? Colors.primary.MINT: Colors.primary.GRAY}
            />
            </View>
            <View style={{
                marginBottom:12,
            }}>
            <Button
                title ="Pescatarian"
                onPress={()=>{
                disableButton(4);
                setButtonIndex(1);
                setNextPage("q2");
                }}
                color={buttonIndex==1 ? Colors.primary.MINT: Colors.primary.GRAY}
            />
            </View>
            <View style={{
                marginBottom:12,
            }}>
            <Button
                title="Vegetarian"
                onPress={()=>{
                disableButton(6);
                setButtonIndex(2);
                setNextPage("q2");
                }}
                color={buttonIndex==2 ? Colors.primary.MINT: Colors.primary.GRAY}
            />
            </View>
            <View style={{
                marginBottom:12,
            }}>
            <Button
                title ="Vegan/Plant-Based"
                onPress={()=>{
                disableButton(10);
                setButtonIndex(3);
                setNextPage("q2");
                }}
                color={buttonIndex==3 ? Colors.primary.MINT: Colors.primary.GRAY}
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
            onPress={() =>{
                navigation.navigate(nextPage,{
                foodScore:foodScoreCalc,
                });
            }}
            disabled={isDisabled ? false: true}
            />
            </View>
            </View>
            </>
        )
}