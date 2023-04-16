import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { VictoryPie } from 'victory-native';
import { Colors } from '../styling/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FetchMonthEmissions } from './FetchMonthEmissions';
import { ScreenNames } from '../navigation/screens/Main/ScreenNames';
import LoadingIndicator from './LoadingIndicator';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;
const chartWidth = windowWidth - (margin * 2);
const chartHeight = 210;

const dummyData = [
    { x: "Transport", y: Math.round(Math.random() * 10000) },
    { x: "Lifestyle", y: Math.round(Math.random() * 10000) },
    { x: "Home", y: Math.round(Math.random() * 10000) },
    { x: "Diet", y: Math.round(Math.random() * 10000) },
];

// Ticket C4-19
/**
    This function fetches and aggregates emissions data by category for a given month and user ID from the server.

    @param {string} yearMonth - The year and month in YYYY-MM format
    @param {function} setLoading - A function that takes a boolean as its parameter to update the loading state of the component.
    @param {function} setError - A function that takes an error object as its parameter to update the error state of the component.
    @throws {Error} - An error is thrown if the network request times out or if an error occurs while fetching data.
    @returns {Promise<Array>} - An array of objects containing the total emissions data within their respective categories.
**/
export async function getData(yearMonth, setLoading, setError) {
    // Turn on the loading indicator component
    setLoading(true);

    try {
        // Fetch data from the backend server for the given month
        const fetched_data = await Promise.race([
            FetchMonthEmissions(yearMonth, 338), // TODO: Change hard coded user_id
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('Network request timed out'));
                }, 25000);
            })
        ]);

        // Return null if no data is fetched
        if (!fetched_data || fetched_data.length === 0) {
            setLoading(false);
            return null;
        }

        // Add up each individual data based on categories
        let transportTotal = 0;
        let lifestyleTotal = 0;
        let homeTotal = 0;
        let dietTotal = 0;

        fetched_data.forEach((data) => {
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

        // Turn off the loading indicator component
        setLoading(false);

        return emissionsData;
    }
    catch (error) {
        console.error(`getData: ${error}`);
        setError(error);
        setLoading(false);
        return null;
    }
}

/**
    This asynchronous function fetches data for a given month and updates the state of the component with the retrieved data.
    If there is an error, the function sets the state for the data, total, and error to a default value.

    @param {string} currentYearMonth - The month for which to fetch data.
    @param {function} setData - A state setter function to set the fetched data.
    @param {function} setTotal - A state setter function to set the total value calculated from the fetched data.
    @param {function} setLoading - A state setter function to set the loading state of the component.
    @param {function} setError - A state setter function to set the error state of the component.
    @returns {Promise<void>} - A promise that resolves when the data has been fetched and the state has been updated.
    @throws {Error} - If there is a problem fetching the data.
*/
export async function fetchData(currentYearMonth, setData, setTotal, setLoading, setError) {
    try {
        const newData = await getData(currentYearMonth, setLoading, setError);

        if (newData === null) {
            setData([]);
            setTotal(0);
        } else {
            setData(newData);
            setTotal(newData.reduce((acc, datum) => acc + datum.y, 0));
        }
    } catch (error) {
        console.error(`CategoryChart (useEffect): ${error}`);
        setData([]);
        setTotal(0);
        setError(error);
    }
}

/**
    Renders the label for each section of the pie chart

    @param {Object} datum - An object representing each section of the pie chart with properties 'x' and 'y'.
    @param {number} total - The total sum of values represented in the pie chart.
    @returns {string|null} - Returns a string representing the label for each section of the pie chart, or null if the percentage is less than 4%.
**/
export const getLabel = (datum, total) => {
    const percent = Math.round((datum.y / total) * 100);
    if (percent > 4) {
        return `${datum.x}\n${Math.round((datum.y / total) * 100)}%`;
    }
    return null;
};

/**
    Retrieves the label for the selected slice in a chart.

    @param {number|null} selectedSlice - The index of the selected slice or null if no slice is selected.
    @param {Object[]} data - An array of objects representing the data for the chart.
    @param {number} data[].x - The x-coordinate of the data point.
    @param {number} data[].y - The y-coordinate of the data point representing the weight of CO2 in lbs.
    @returns {string|null} - The label for the selected slice, including the x-coordinate and the weight of CO2 in lbs, or null if no slice is selected.
**/
export const getSelectedLabel = (selectedSlice, data) => {
    if (selectedSlice !== null && data.length > selectedSlice) {
        const selectedDatum = data[selectedSlice];
        return `${selectedDatum.x}\n${selectedDatum.y} lbs CO\u2082`;
    }
    return null;
};

/**
    A component that displays a pie chart of emissions data for the current month.

    @param {Object} navigation - An object containing information about the navigation state of the component.
    @returns {JSX.Element} A JSX element that displays a pie chart of emissions data for the current month.
    @throws {Error} An error is thrown if an error occurs while fetching data.
    @example
        import { CategoryChart } from './CategoryChart';

        function MyComponent() {
            return (
                <CategoryChart navigation={navigation} />
            );
        }
**/
export const CategoryChart = ({navigation}) => {
    // State variables
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedSlice, setSelectedSlice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get the current year and month in YYYY-MM format
    const now = new Date();
    const currentYearMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;

    // Get the current month to display on the label
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const currMonthString = monthNames[now.getMonth()];

    // Fetches data for the current month and updates state accordingly. Handles errors and null cases.
    useEffect(() => {
        fetchData(currentYearMonth, setData, setTotal, setLoading, setError);
    }, []);

    // Select slice on press events
    const handlePress = (event, props) => {
        setSelectedSlice(props.index);
    };

    // Loading indicator shown if loading is true.
    if(loading){
        return (
            <LoadingIndicator loading={loading}/>
        );
    }

    // Show error message if error exists.
    if (error) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 60}}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Unable to connect</Text>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>Please check your network settings and try again.</Text>
            </View>
        );
    }

    // Renders a message and a button to add emissions if there is no data available for the current month.
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>You have no data for this month.</Text>
                <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.RECORD_EMISSION)}>
                    <View style={{ backgroundColor: Colors.primary.MINT, padding: 10, marginTop: 12, borderRadius: 12 }}>
                        <Text style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 14 }}>Add Emissions</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    // Components for the pie chart
    const pieRadius = (windowWidth - (margin * 2)) * 0.4;
    const innerRadius = pieRadius * 0.65;
    const labelRadius = ((pieRadius + innerRadius) / 2);

    // Renders the actual pie chart if everything is working properly
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
                }}
            >
                {/* Displays the current month in the center of the pie chart */}
                <View style={{ paddingBottom: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' }}>{currMonthString}</Text>
                </View>

                {/* Displays the category and its value under the month */}
                {selectedSlice == null && ( // A slice has not yet selected
                    <View style={{ }}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Click a section</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>to learn more</Text>
                    </View>
                )}
                {selectedSlice !== null && ( // A slice has been selected
                    <View style={{ }}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>{getSelectedLabel(selectedSlice, data)}</Text>
                    </View>
                )}
            </View>
        </View>
    );
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