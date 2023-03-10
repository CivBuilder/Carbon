import * as React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import { Colors } from '../../../colors/Colors';
import { LineChartFootprint, CategoryChart, CatgegoryChartv2 } from '../Home/ChartData';
import RecordEmission from './RecordEmission';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;

export default function ProgressScreen() {
    return(
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                <RecordEmission />


                {/* Chart #1 */}
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>By Time</Text>
                    <LineChartFootprint/>
                </View>

                {/* Chart #2 */}
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>By Category</Text>
                    <View style={{backgroundColor: Colors.primary.MINT_CREAM, borderRadius: 16}}>
                        <CatgegoryChartv2/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: margin,
    },
    container: {
        margin: margin,
        // backgroundColor: "lightblue",
    },
});