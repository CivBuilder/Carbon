import React from 'react';
import { Dimensions, View, Text, SafeAreaView, ScrollView } from 'react-native';

import GoalSetter from './GoalSetter';
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;

export default function AddGoal({ navigation }) {
    return (
        <SafeAreaView style={{ height: windowHeight, backgroundColor: '#F7FCF8' }}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 1 }}
            >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView style={{ height: 180, marginVertical: 12, marginBottom: 30 }} source={require('../../../assets/lotties/bikewind.json')} autoPlay loop />
            </View>
            <GoalSetter navigation={navigation} />
                
            </ScrollView>
        </SafeAreaView>
    )
}
