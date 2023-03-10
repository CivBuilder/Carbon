import * as React from 'react';
import {useState, Component} from 'react';
import {StyleSheet,View, Text,Button} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DropDownPicker from 'react-native-dropdown-picker';

//TODO:
//Change Questions into a Class Component?
//Change in-line styling to class styling

//Screens
function InitialScreen({navigation}){
    return (
        <View
        style={{
        textAlign:'center',
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        }}>
        <Button
        onPress={()=>navigation.navigate("What is your diet?")}
        title = "Begin Questionnaire"
        />
        </View>
    );
}

function Question1({navigation}){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'No Restrictions', value: 'No restrictions'},
        {label: 'Pescatarian', value: 'Pescatarian'},
        {label: 'Vegetarian', value: 'Vegetarian'},
        {label: 'Vegan/Plant-Based', value: 'Vegan/Plant-Based'},
    ]);

    return (
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(item)=>{
            navigation.navigate("Household Power Source:");
        }} />
    );
}
function Question2({navigation}){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    {label: 'Coal', value: 1},
    {label: 'Petroleum', value: 2},
    {label: 'Natural Gas', value: 3},
    {label: 'Renewable Energy(Solar,Wind,Etc...)', value: 4},
    ]);

    return (
    <View>
    <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    onSelectItem={(item)=>
        navigation.navigate('Preferred Transportation:')
    }
    />
    </View>
    );
}
function Question3({navigation}){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    {label: 'Gas-Powered Vehicle', value: 0},
    {label: 'Diesel-Powered Vehicle', value: 1},
    {label: 'Hybrid Vehicle', value: 2},
    {label: 'Electric Vehicle', value:3},
    {label: 'Public Transportation', value: 4},
    ]);

    return (
    <View>
    <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    onSelectItem={(item)=>
    {
        navigation.navigate('Main');//Replace Home with signup
    }}
    />
    </View>
    );
}
const QuestStack = createNativeStackNavigator();
export default function QuestionnaireContainer({navigation}){
    return(
            <QuestStack.Navigator initialRouteName="Please Answer the following Questions">
            <QuestStack.Screen
            name ="Tell us about yourself"
            component ={InitialScreen} />
            <QuestStack.Screen
            name ="What is your diet?"
            component ={Question1} />
            <QuestStack.Screen
            name ="Household Power Source:"
            component ={Question2} />
            <QuestStack.Screen
            name ='Preferred Transportation:'
            component ={Question3} />
            </QuestStack.Navigator>
            //navigation.navigate("Home")
    );
};