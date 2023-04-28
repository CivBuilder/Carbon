import React from 'react';
import { Dimensions, View, Text, SafeAreaView, ScrollView } from 'react-native';

import GoalSetter from './GoalSetter';

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
                <GoalSetter navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )
}
