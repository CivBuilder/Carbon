import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { faDollarSign } from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../colors/Colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;
const chartWidth = windowWidth - (margin * 2);
const chartHeight = 210;

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
const today = new Date();
const currentMonth = monthNames[today.getMonth()];

const data = [
    { x: "Transport", y: Math.round(Math.random() * 10000) },
    { x: "Diet", y: Math.round(Math.random() * 10000) },
    { x: "Home", y: Math.round(Math.random() * 10000) },
    { x: "Stuff", y: Math.round(Math.random() * 10000) },
];

// Ticket C4-19
export const CatgegoryChart = () => {
    const pieRadius = (windowWidth - (margin * 2)) * 0.4;
    const innerRadius = pieRadius * 0.65;
    const labelRadius = ((pieRadius + innerRadius) / 2);

    const total = data.reduce((acc, datum) => acc + datum.y, 0);

    // Converts each values into percentage
    const getLabelPercent = (datum) => {
        const percent = Math.round((datum.y / total) * 100);
        if (percent > 4) {
            return `${Math.round((datum.y / total) * 100)}%`;
        }
        return null;
    };

    const [selectedSlice, setSelectedSlice] = useState(null);

    const handlePress = (event, props) => {
        const selectedDatum = data[props.index];
        setSelectedSlice(props.index);
        // console.log(`Selected slice: ${selectedDatum.x} (${selectedDatum.y})`);
    };

    // Shows the value of the selected section in the middle of the pie chart
    const getSelectedLabel = () => {
        if (selectedSlice !== null) {
            const selectedDatum = data[selectedSlice];
            return `${selectedDatum.x}: ${selectedDatum.y}`;
        }
        return null;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: -40 }}>
            <VictoryPie
                data={data}
                colorScale={["#5D5FEF", "#FF8C00", "#3CB371", "#FF69B4"]}
                padAngle={2}
                radius={pieRadius}
                innerRadius={innerRadius}
                cornerRadius={6}
                labelRadius={labelRadius}
                labels={({ datum }) => getLabelPercent(datum)}
                style={{
                    labels: {
                        fill: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                        textAnchor: "middle",
                        verticalAnchor: "middle",
                    },
                }}
                events={[{
                    target: 'data',
                    eventHandlers: {
                        onPressIn: handlePress,
                    },
                },]}
                animate={{ duration: 500, ease: "exp" }}
                selected={[selectedSlice]}
            />
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                }}>
                <View style={{ paddingBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>{currentMonth}</Text>
                </View>

                {selectedSlice == null && ( // A slice has not yet selected
                    <View style={{ paddingBottom: 1}}>
                        <Text style={{ textAlign: 'center' }}> </Text>
                    </View>
                )}
                {selectedSlice !== null && ( // A slice has been selected
                    <View style={{ }}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>{getSelectedLabel()}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chart: {
        borderRadius: 16,
    },
    chartConfig: {
        backgroundColor: Colors.primary.MINT,
        backgroundGradientFrom: Colors.primary.MINT,
        backgroundGradientTo: Colors.primary.MINT,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "5",                         // circle size
            strokeWidth: "2",               // circle border size
            stroke: Colors.primary.MINT     // circle border color
        }
    },
});