import { View, Text } from "react-native";
import { KeyFactorsCSS as styling } from "../../../styling/KeyFactorsCSS";
import { Colors } from "../../../styling/Colors";
import { Ionicons } from '@expo/vector-icons';

// Jira Ticket C4-20
const KeyFactors = (props) => {
  const {data} = props;
  const colorScale = Object.values(Colors.categories);
  let totalEmissions = 0;

  for (var category of data) totalEmissions += category.y;

  // Displays the change in emission from the current month to the previous month.
  // const difference = (num1, num2) => {
  //   const value = num1-num2;
  //   const diff = <Text>{Math.abs(value)}</Text>;
  //   const bad_change = <Ionicons name={'caret-up'} size={16} color={'#FF6961'}/>;
  //   const good_change  = <Ionicons name={'caret-down'} size={16} color={'#61FF69'}/>;

  //   if (value == 0) return null;
  //   return (
  //     <View style={[styling.category, {alignContent: 'flex-end', flex: 1}]}>
  //       { value > 0 && (
  //         <>{bad_change}{diff}</>
  //       )}
  //       { value < 0 && (
  //         <>{good_change}{diff}</>
  //       )}
  //     </View>
  //   )
  // };

  return (
    <View style={styling.keyFactors}>
      {data.map((category, index) => (
        <View key={index} style={styling.category}>
          {/* Emission Category Title */}
          <View style={styling.title}>
            <Ionicons name={"ellipse"} size={14} style={{marginEnd: 7, marginTop: 1, color: colorScale[index]}}/>
            <Text>{category.x}</Text>
          </View>
          {/* Emission Quantity */}
          <View style={styling.emission}>
            <Text>{category.y}</Text>
            <Text style={styling.units}>{` lbs CO\u2082`}</Text>
          </View>
          {/* Percentage of total emissions */}
          <View style={styling.percentage}>
            <Text>{`${((category.y/totalEmissions)*100).toFixed(1)}`}</Text>
            <Text style={styling.units}>%</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default KeyFactors;