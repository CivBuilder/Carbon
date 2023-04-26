import { View, Text } from "react-native";
import { RecentEmissionsCSS as styling } from "../../../styling/RecentEmissionsCSS";
import getRecentEmissions from "../../../util/getRecentEmissions";

const RecentEmissions = ({category}) => {
  const data = [];

  return (
    <View style={styling.recentEmissions}>
      {data.length !== 0 ? data.map((entry, index) => (
        <View key={index} style={styling.entry}>
          {/* Emission recorded date */}
          <View style={styling.date}>
            <Text style={styling.value}>{entry[0]}</Text>
          </View>
          {/* Emission amount */}
          <View style={styling.emission}>
            <Text style={styling.value}>{entry[1]}</Text>
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