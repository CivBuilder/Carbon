import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { RadarChart } from 'react-native-chart-kit';
const windowWidth = Dimensions.get("window").width;
const chartWidth = windowWidth - 20;

const chartConfig = {
    backgroundColor: '#000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
  };
  
  const data = {
    labels: ['Sales', 'Revenue', 'Profit', 'Loss', 'Customers'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      },
    ],
  };
  
  export default function DwmLog() {
    return (
      <View>
        <RadarChart
          data={data}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    );
  }