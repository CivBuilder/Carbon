import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import QuestionnaireContainer from './navigation/QuestionnaireContainer';
//import { Amplify } from 'aws-amplify'
//import awsconfig from './src/aws-exports'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Amplify.configure(awsconfig)


const Stack = createNativeStackNavigator();
function App(){
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Questionnaire">
        <Stack.Screen name ="Questionnaire"
        component ={QuestionnaireContainer} />
        <Stack.Screen name = "Home"
        component = {MainContainer}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;