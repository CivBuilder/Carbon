import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { VictoryPie, VictoryLabel } from 'victory-native';
import { Svg } from 'react-native-svg';
import { Colors } from '../../../colors/Colors';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const horizontalMargin = 20;
const chartWidth = windowWidth - horizontalMargin;
const chartHeight = 200;

export const CarbonFootprint = () => {
    const userFootprint = 69420
    const maxFootprint = 100000
    const data = [
        {x: 'total', y: maxFootprint - userFootprint},
        {x: 'user', y: userFootprint},
    ]
    const pieColors = [
        Colors.secondary.NON_PHOTO_BLUE,
        Colors.primary.MINT,
    ];

    return (
        <View style={{marginTop: -30, marginBottom: 20, }}>
            <Svg width={chartWidth} height={chartHeight}>
                <VictoryPie
                    data={data}
                    labels={[]}
                    colorScale={pieColors}
                    startAngle={90}
                    endAngle={-90}
                    innerRadius={110}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 40, fontWeight: 'bold' }}
                    x={200}
                    y={155}
                    text={`${userFootprint}`}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20 }}
                    x={200}
                    y={185}
                    text={`kg CO2e`}
                />
            </Svg>
        </View>
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

// Ticket C4-19
export const CategoryChart = () => {
    //TODO: Change hardcoded values to link with back end
    const data = [
        {
            name: 'Transport',
            carbonFootprint: 4000,
            color: '#C70039',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
        {
            name: 'Diet',
            carbonFootprint: 6000,
            color: '#FF5733',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
        {
            name: 'Home',
            carbonFootprint: 8000,
            color: '#FFC300',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
        {
            name: 'Stuff',
            carbonFootprint: 5000,
            color: '#DAF7A6',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
    ];

    const chartConfig = {
        backgroundColor: Colors.primary.MINT,
        backgroundGradientFrom: Colors.primary.MINT,
        backgroundGradientTo: Colors.primary.MINT,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    };

    return (
        <PieChart
            data={data}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            accessor={'carbonFootprint'}
            paddingLeft={'30'}
            absolute
            renderLegend={() => null}
            renderLabels={({ category, percentage, index }) => (
                <Text key={index} style={{ color: 'white', position: 'absolute', textAlign: 'center' }}>
                    {category} {'\n'} ({percentage.toFixed(0)}%)
                </Text>
            )}
        />
    );
};

export const CatgegoryChartv2 = () => {
    const data = [
        { x: 'Transport', y: 4000 },
        { x: 'Diet', y: 6000 },
        { x: 'Home', y: 8000 },
        { x: 'Stuff', y: 5000 },
    ];

    const pieColors = ['#C70039', '#FF5733', '#FFC300', '#DAF7A6'];

    return (
        <View>
            <Svg width={chartWidth} height={chartHeight}>
                <VictoryPie
                    data={data}
                    colorScale={pieColors}
                    labels={({ datum }) => `${datum.x}\n${datum.y}`}
                    labelRadius={85}
                    padAngle={2}
                    innerRadius={60}
                    style={{
                        labels: { fill: 'white', fontSize: 14, fontWeight: 'bold' },
                    }}
                />
            </Svg>
        </View>
    );
};

export function DailyLog ({dataArray}) {

   
    const barChartData = {
        labels: ['Transportation', 'Diet', 'Lifestyle', 'Home', 'Overall', ''],
        datasets:[
            {
            data: dataArray,
            colors: [
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 0) => `#FFFFFF`,
            ]
            }
        ]
        };
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
        showBarTops = {false}
    />
    )
}
const styles = StyleSheet.create({
    container: {
        marginLeft: 100,
        flex: 1,
        justifyContent: 'center', padding: 100,
        paddingTop: 30, backgroundColor: '#ecf0f1',
        },
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

const styleBar = StyleSheet.create({
    container: {
        marginLeft: 100,
        flex: 1,
        justifyContent: 'center', padding: 100,
        paddingTop: 30, backgroundColor: '#ecf0f1',
        },
    chart: {
        borderRadius: 16,
        
        marginHorizontal: horizontalMargin/2,
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
});