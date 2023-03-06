import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { ProgressCircle } from 'react-native-svg-charts';
import { Colors } from '../../../colors/Colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const horizontalMargin = 20;
const chartWidth = windowWidth - horizontalMargin;
const chartHeight = 200;

export const CarbonFootprint = () => {
    const maxFootprint = 100000; //TODO: Change hardcoded data
    const userFootprint = 69420; //TODO: Change hardcoded data
    const percentFootprint = userFootprint / maxFootprint;

    return (
        <ProgressCircle
            style={{ height: 250, marginBottom: -110, marginVertical: 20 }}
            progress={percentFootprint}
            progressColor={Colors.primary.MINT}
            backgroundColor={'rgba(194, 65, 244, 0.1)'}
            strokeWidth={14}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
        >
            {/* TODO: Add gradient where it starts mint green at 0 then fades to red at 70% */}
            {/* <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={Colors.primary.MINT} />
                <Stop offset="70%" stopColor={Colors.secondary.CELADON} />
            </LinearGradient> */}
            <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', top: -40,}}>
                <Text style={{ fontSize: userFootprint >= 100000 ? 32 : 40, fontWeight: 'bold' }}>{userFootprint}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>lbs CO₂ </Text>
            </View>
        </ProgressCircle>
    );
};

export const LineChartFootprint = () => {
    const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            // TODO: Change hardcode data
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        }]
    };

    return(
        <LineChart
        data={lineChartData}
        width={chartWidth}
        height={chartHeight}
        //yAxisLabel=""
        yAxisSuffix=" lb"
        yAxisInterval={1}
        chartConfig={styles.chartConfig}
        style={styles.chart}
        bezier
    />
    );
};

export const ProgressRingCategory = () => {
    const progressRingData = {
        labels: ["Transport", "Diet", "Home", "Stuff"],
        data: [0.4, 0.6, 0.8, 0.5] //TODO: Change hardcoded data
    };

    return(
        <ProgressChart
            data={progressRingData}
            width={chartWidth}
            height={chartHeight}
            strokeWidth={12}
            radius={24}
            chartConfig={styles.chartConfig}
            hideLegend={false}
            style={styles.chart}
        />
    );
};

export const DailyLog = () => {
    const barChartData = { 
        labels: ["Group A", "Group B", "Group C"],
        datasets:[
            {
           data: [854, 393, 760]
            }
        ]
        };
    return (
        <BarChart 
        data ={barChartData} 
        chartConfig={styles.chartConfig}
        style={styles.chart}
        width = {chartWidth}
        height = {chartHeight-100}
        withVerticalLabels ={true}
        withHorizontalLabels = {false}
        yAxisLabel="$"
        fromZero = {true}
      />
    )
}
const styles = StyleSheet.create({
    chart: {
        borderRadius: 16,
        marginHorizontal: horizontalMargin/2,
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