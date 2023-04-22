import React, {useState,useEffect} from 'react';
import {View, Text,Switch,Button,TextInput } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Colors } from '../../../colors/Colors';

import StartScreen from './Start';
import DietScreen from './QuestionDiet';
import HouseholdScreen from './QuestionHousehold';
import BillScreen from './QuestionBills';
import TransportScreen from './QuestionTransport';
import VehicleTypeScreen from './QuestionVehicleType';
import MileageScreen from './QuestionMileage';
import PublicTransportScreen from './QuestionPublicTransport';
import FinishedScreen from './Finished';


const Stack = createNativeStackNavigator();

export default function Questionnaire() {
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="GetStarted"
            >
                <Stack.Screen name = "GetStarted" component={StartScreen}/>
                <Stack.Screen name="q1" component={DietScreen}/>
                <Stack.Screen name="q2" component={HouseholdScreen}/>
                <Stack.Screen name="q3" component={BillScreen}/>
                <Stack.Screen name="q4" component={TransportScreen}/>
                <Stack.Screen name="q4a" component={VehicleTypeScreen}/>
                <Stack.Screen name="q4b" component={MileageScreen}/>
                <Stack.Screen name="q4c" component={PublicTransportScreen}/>
                <Stack.Screen name="finished" component={FinishedScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

