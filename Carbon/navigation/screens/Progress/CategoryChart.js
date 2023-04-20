import { VictoryStack, VictoryBar } from "victory-native";
import getMinBarSize from "../../../util/getMinBarSize";
import getEdgeIndices from "../../../util/getEdgeIndices";
import { Colors } from "../../../styling/Colors";
// import { CategoryChartStylesheet as styling } from "../styling/CategoryChartStylesheet";

const CategoryChart = (props) => {
  const {data} = props;
  // const data = [{ "x": "Transport", "y": 50 }, { "x": "Lifestyle", "y": 20 }, { "x": "Home", "y": 10 }, { "x": "Diet", "y": 90 }];
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
    <VictoryStack
      horizontal
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
  );
};

export default CategoryChart;