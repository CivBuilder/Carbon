import * as React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../colors/Colors';
import { LineChartFootprint, CategoryChart, CatgegoryChartv2 } from '../Home/ChartData';
import { ScreenNames } from '../Main/ScreenNames';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;

export default function ProgressScreen({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 1 }}
            >
                {/* Chart #1 */}
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>By Time</Text>
                    <LineChartFootprint />
                </View>

                {/* Chart #2 */}
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>By Category</Text>
                    <View style={{ backgroundColor: Colors.primary.MINT_CREAM, borderRadius: 16 }}>
                        <CatgegoryChartv2 />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.ADD_GOAL)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Set Goal</Text>
                        </View>
                    </TouchableOpacity>
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
    button: {
        backgroundColor: Colors.primary.MINT,
        height: 40,
        width: 105,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    buttonText: {
        color: Colors.primary.MINT_CREAM,
        fontSize: 20,
        fontWeight: 'bold',
    },
});