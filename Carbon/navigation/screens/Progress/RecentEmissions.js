import { View, Text } from "react-native";
import { RecentEmissionsCSS as styling } from "../../../styling/RecentEmissionsCSS";

const RecentEmissions = (props) => {
  let {records, category} = props;

  return (
    <View style={styling.recentEmissions}>
      {records.length !== 0 ? records.map((entry, index) => (
        <View key={index} style={styling.entry}>
          {/* Emission recorded date */}
          <View style={styling.date}>
            <Text style={styling.value}>{entry.date}</Text>
          </View>
          {/* Emission amount */}
          <View style={styling.emission}>
            <Text style={styling.value}>{entry[category]}</Text>
            <Text style={styling.units}>{` lbs CO\u2082`}</Text>
          </View>
        </View>
      )) :
        <View style={styling.entry}>
          {/* No data */}
          <View style={styling.empty}>
            <Text style={styling.notFound}>No recorded emissions found.</Text>
          </View>
        </View>
      }
    </View>
  );
};

export default RecentEmissions;