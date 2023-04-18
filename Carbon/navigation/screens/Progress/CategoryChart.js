import { View, Text } from "react-native";
import { VictoryStack, VictoryBar } from "victory-native";
// import { CategoryChartStylesheet as styling } from "../styling/CategoryChartStylesheet";

const CategoryChart = (props) => {
  // const {data} = props;
  const data = [{"x": "Transport", "y": 160}, {"x": "Lifestyle", "y": 33}, {"x": "Home", "y": 2}, {"x": "Diet", "y": 85}];
  const categories = [];

  for (var slice of data) {
    slice.x = "dummy";
    categories.push(new Array(slice));
  };

  return (
    <VictoryStack
      horizontal
      colorScale={["tomato", "orange", "gold", "red"]}
    >
      {categories.map((category, index) => {
        return (
          <VictoryBar
            key={index}
            data={category}
            cornerRadius={{
              top: index === categories.length-1 ? 13 : 0,
              bottom: index === 0 ? 13 : 0,
            }}
            barWidth={26}
            y={datum => Math.max(datum.y, 15)}
          />
        );
      })}
    </VictoryStack>
  );
};

export default CategoryChart;