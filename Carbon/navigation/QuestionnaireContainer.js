import * as React from 'react';
import {StyleSheet,View, Text,Button} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
function initialScreen(){
    return (
        <View
        style={{
        textAlign:'center',
        marginTop: 325,
        marginLeft: 100,
        marginRight:100,
        }}>
        <Text>Tell us about yourself</Text>
        <Button
        onPress={()=>navigation.navigate("q1")}
        title = "Begin Questionnaire"
        />
        </View>
    );
}
function q1(){
    return (
            <Text>Question 1</Text>
    );
}
//function q2(){

//};
//function q3(){

//};
const QuestStack = createNativeStackNavigator();
export default function QuestionnaireContainer({navigation}){
    return(
            <QuestStack.Navigator initialRouteName="Screening">
            <QuestStack.Screen name ="Screening"
                    component ={initialScreen} />
            <QuestStack.Screen name ="Q1"
                    component ={q1} />
            </QuestStack.Navigator>
    );
};