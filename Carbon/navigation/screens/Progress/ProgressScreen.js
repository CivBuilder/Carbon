import * as React from 'react';
import { View, SafeAreaView, ScrollView, Text } from 'react-native';
import { CatgegoryChart, KeyFactors } from '../../../components/ChartData';
import { ScreenNames } from '../Main/ScreenNames';
import { styles } from '../../../components/Styles';

export default function ProgressScreen({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 1 }}
            >
                {/* <View>
                    <RecordEmission />
                </View> */}
                <View style={styles.container}>
                    <View style={styles.chart}>
                        <CatgegoryChart />
                    </View>
                </View>
                <View>
                    {/* <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ADD_GOAL)}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Set Goal</Text>
                        </View>
                    </TouchableOpacity> */}
                    <View style={styles.container}>
                        <View style={styles.chart}>
                            <KeyFactors />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}