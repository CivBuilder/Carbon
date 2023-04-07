import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { VictoryPie } from 'victory-native';
import { Colors } from '../colors/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FetchMonthEmissions } from './FetchMonthEmissions';
import { ScreenNames } from '../navigation/screens/Main/ScreenNames';

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

const dummyData = [
    { x: "Transport", y: Math.round(Math.random() * 10000) },
    { x: "Lifestyle", y: Math.round(Math.random() * 10000) },
    { x: "Home", y: Math.round(Math.random() * 10000) },
    { x: "Diet", y: Math.round(Math.random() * 10000) },
];

// Ticket C4-19
//Helper functions

/*  Gets the data from FetchMonthEmissions API using the current month
    and current user's user_id.
*/
export async function getData(currentMonth, FetchMonthEmissions) {
    try {
        //Grabs
        const fetched_data = await FetchMonthEmissions(currentMonth, 27); // TODO: Change hard coded user_id
        // console.log(fetched_data);
        const parsed_JSON = JSON.parse(fetched_data);

        // Add up each individual data based on categories
        let transportTotal = 0;
        let lifestyleTotal = 0;
        let homeTotal = 0;
        let dietTotal = 0;

        parsed_JSON.forEach((data) => {
            transportTotal += data.transport_emissions;
            lifestyleTotal += data.lifestyle_emissions;
            homeTotal += data.home_emissions;
            dietTotal += data.diet_emissions;
        });

        // Return with all the fetched data added up within their respective categories
        const emissionsData = [
            { x: "Transport", y: transportTotal },
            { x: "Lifestyle", y: lifestyleTotal },
            { x: "Home", y: homeTotal },
            { x: "Diet", y: dietTotal },
        ];
        // console.log(emissionsData);

        return emissionsData;
    }
    catch (error) {
        console.error(`getData: ${error}`);
        return null;
    }
}

// Renders the label for each section of the pie chart
export const getLabel = (datum, total) => {
    const percent = Math.round((datum.y / total) * 100);
    if (percent > 4) {
        return `${datum.x}\n${Math.round((datum.y / total) * 100)}%`;
    }
    return null;
};

export const CategoryChart = ({navigation}) => {
    //Components for the pie chart
    const pieRadius = (windowWidth - (margin * 2)) * 0.4;
    const innerRadius = pieRadius * 0.65;
    const labelRadius = ((pieRadius + innerRadius) / 2);

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedSlice, setSelectedSlice] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const newData = await getData(currentMonth);
                setData(newData);
                setTotal(newData.reduce((acc, datum) => acc + datum.y, 0));
            } catch (error) {
                console.error(`CategoryChart (useEffect): ${error}`);
                setData([]);
                setTotal(0);
            }
        }
        fetchData();
    }, []);

    const handlePress = (event, props) => {
        const selectedDatum = data[props.index];
        setSelectedSlice(props.index);
    };

    // Shows the value of the selected section in the middle of the pie chart
    const getSelectedLabel = () => {
        if (selectedSlice !== null) {
            const selectedDatum = data[selectedSlice];
            return `${selectedDatum.x}\n${selectedDatum.y} lbs CO2`;
        }
        return null;
    };

    if(!data || data.length === 0){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>You have no data for this month.</Text>

                {/* TODO: Switch the navigation to RecordEmission */}
                <TouchableOpacity  onPress={() => navigation.navigate(ScreenNames.ADD_GOAL)}>
                    <View
                        style={{backgroundColor: Colors.primary.MINT, padding: 10, marginTop: 12, borderRadius: 12}}
                    >
                        <Text style={{color: Colors.primary.MINT_CREAM, fontWeight: "bold", fontSize: 14}}>Add Emissions</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else {
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
                    labels={({ datum }) => getLabel(datum, total)}
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
                    <View style={{ paddingBottom: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>{currentMonth}</Text>
                    </View>
                    {selectedSlice == null && ( // A slice has not yet selected
                        <View style={{ }}>
                            <Text style={{ textAlign: 'center' }}>Click a section to learn more</Text>
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
    }
};

//Data for later
/*
    The daily log function, this takens in a data array and maps it into a bar chart based on its values
 */
export function DailyLog ({dataArray}) {

    //Our data for bar styling the bar chart
    const barChartData = {
        labels: ['Transportation', 'Diet', 'Lifestyle', 'Home', 'Overall'],
        datasets:[
            {
            data: dataArray,
            colors: [
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT, //all colors will be MINt
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
            ]
            }
        ]
        };
        //Return the bar chart with appropriate styling.
    return (
        <BarChart
        data ={barChartData}
        chartConfig={styleBar.chartConfig}
        withCustomBarColorFromData={true}
        flatColor={true}
        style={styleBar.chart}
        width = {chartWidth}
        height = {windowHeight/3}
        withVerticalLabels ={true}
        withHorizontalLabels = {true}
        fromZero = {true}
    />
    )
}

// Jira Ticket C4-20
export const KeyFactors = () => {
  // Temp data to represent a prior month to show comparison to the current month's progress by category.
  const temp_data = 3500;

  // Displays the change in emission from the current month to the previous month.
  const difference = (num1, num2) => {
    const value = num1-num2;
    const diff = <Text>{Math.abs(value)}</Text>;
    const bad_change = <Ionicons name={'caret-up'} size={16} color={'#FF6961'}/>;
    const good_change  = <Ionicons name={'caret-down'} size={16} color={'#61FF69'}/>;

    if (value == 0) return null;
    return (
      <View style={[styleBar.category, {alignContent: 'flex-end', flex: 1}]}>
        { value > 0 && (
          <>{bad_change}{diff}</>
        )}
        { value < 0 && (
          <>{good_change}{diff}</>
        )}
      </View>
    )
  };

  return (
    <View style={styleBar.keyFactors}>
      {dummyData.map(entry => (
        <View key={entry.x} style={styleBar.category}>
          <Text style={{flex: 3}}>{entry.x}</Text>
          <Text style={{flex: 2}}>{entry.y}</Text>
          {difference(entry.y, temp_data)}
        </View>
      ))}
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

//Style bar which was created by Miguel
const styleBar = StyleSheet.create({
    container: {
        marginLeft: 100,
        flex: 1,
        justifyContent: 'center', padding: 100,
        paddingTop: 30, backgroundColor: '#ecf0f1',
        },
    chart: {
        borderRadius: 16,
        marginHorizontal: margin/2,
    },
    chartConfig: {

        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, //transparent
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

        propsForDots: {
            r: "5",                         // circle size
            strokeWidth: "2",               // circle border size
            stroke: Colors.primary.MINT     // circle border color
        }
    },
    keyFactors: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: margin,
        marginVertical: margin-5
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
        marginVertical: 5
    },
});