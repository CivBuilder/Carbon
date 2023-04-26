import Category from "./Category";
import { View } from "react-native";
import { KeyFactorsCSS as styling } from "../../../styling/KeyFactorsCSS";

const KeyFactors = (props) => {
  const {data} = props;

  let totalEmissions = 0;
  for (var category of data) totalEmissions += category.y;

  return (
    <View style={styling.keyFactors}>
      {data.map((category, index) => (
        <Category
          key={index}
          id={index}
          title={category.x}
          emission={category.y}
          percentage={`${((category.y / totalEmissions) * 100).toFixed(1)}`}
        />
      ))}
    </View>
  );
};

export default KeyFactors;