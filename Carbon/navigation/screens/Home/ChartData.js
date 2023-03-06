import { StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { Colors } from '../../../colors/Colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const horizontalMargin = 20;
const chartWidth = windowWidth - horizontalMargin;
const chartHeight = 200;

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