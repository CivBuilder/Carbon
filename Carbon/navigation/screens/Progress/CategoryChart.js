import { Dimensions, View } from 'react-native';
import { VictoryStack, VictoryBar } from "victory-native";
import getMinBarSize from "../../../util/getMinBarSize";
import getEdgeIndices from "../../../util/getEdgeIndices";
import { Colors } from "../../../styling/Colors";
// import { CategoryChartCSS as styling } from "../styling/CategoryChartCSS";

const chartWidth = Dimensions.get("window").width * 0.8;
const chartHeight = Dimensions.get("window").height * 0.08;

const CategoryChart = (props) => {
  const {data} = props;
  const [newData, newYKey] = getMinBarSize(data);
  const [firstCategory, lastCategory] = getEdgeIndices(data);
  const colorScale = Object.values(Colors.categories);
  let categories = [];

  for (var i in newData) {
    newData[i].fill = colorScale[i];
    newData[i].x = "dummy";
    categories.push(new Array(newData[i]));
  };

  return (
    <View style={{justifyContent: "center", alignItems: "center", marginBottom: 5}}>
      <VictoryStack
        horizontal
        height={chartHeight}
        width={chartWidth}
        padding={0}
      >
        {categories.map((category, index) => {
          return (
            <VictoryBar
              key={index}
              data={category}
              cornerRadius={{
                top: index === lastCategory ? 7 : 0,
                bottom: index === firstCategory ? 7 : 0,
              }}
              style={{ data: { fill: ({ datum }) => datum.fill } }}
              barWidth={28}
              y={datum => datum.y === 0 ? 0 : datum[newYKey]}
            />
          );
        })}
      </VictoryStack>
    </View>
  );
};

export default CategoryChart;