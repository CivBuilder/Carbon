import * as React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

import { LineChartFootprint, ProgressRingCategory } from '../Home/ChartData';

// const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ProgressScreen({navigation}) {
    return(
        <SafeAreaView style={{height: windowHeight}}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                <View style={{marginVertical: 10,}}>
                    <Text>By Time</Text>
                    <LineChartFootprint/>
                </View>
                <View>
                    <Text>By Category</Text>
                    <ProgressRingCategory/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});