import { View, Text, TouchableOpacity } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import { useToggle } from "../../../hooks/useToggle";
import { CategoryCSS as styling } from "../../../styling/CategoryCSS";
import { Colors } from "../../../styling/Colors";
import { Ionicons } from '@expo/vector-icons';
import RecentEmissions from "./RecentEmissions";
import { getRecentEmissions } from "../../../util/EmissionRecords";

const CategoryContext = createContext();
const { Provider } = CategoryContext;
const colorScale = Object.values(Colors.categories);

const Category = (props) => {
  const { id, title, emission, percentage } = props;
  const [data, setData] = useState([]);
  const { status: expand, toggleStatus: toggleExpand } = useToggle();
  const value = { expand, toggleExpand };

  function groupRecordsByCategory(records) {
    // Create an empty object to store the grouped records
    const groupedRecords = {};
  
    // Loop through each record and group it by category
    records.forEach(record => {
      if (!groupedRecords[record.category]) {
        // If the category does not yet exist in the groupedRecords object,
        // create an empty array for it
        groupedRecords[record.category] = [];
      }
  
      // Add the record to the array for its category
      groupedRecords[record.category].push(record);
    });
  
    // Return the grouped records as an array of arrays
    return Object.values(groupedRecords);
  }

  useEffect(() => {
    async function fetchRecords() {
      const fetchedData = await getRecentEmissions();
      setData(fetchedData);
    }
    fetchRecords();
  }, []);

  const groupRecords = groupRecordsByCategory(data);

  console.log(groupRecords);

  return (
    <Provider value={value}>
      <CategoryHeader
        id={id}
        title={title}
        emission={emission}
        percentage={percentage}
      />
      <CategoryContent
        category={title}
      />
    </Provider>
  );
};

const CategoryHeader = (props) => {
  const { expand, toggleExpand } = useContext(CategoryContext);
  const { id, title, emission, percentage } = props;

  return (
    <TouchableOpacity onPress={toggleExpand} style={styling.category}>
      {/* Emission Category Title */}
      <View style={styling.title}>
        <Ionicons name={"ellipse"} size={13} style={{ marginEnd: 7, marginTop: 1, color: colorScale[id] }} />
        <Text>{title}</Text>
      </View>
      {/* Emission Quantity */}
      <View style={styling.emission}>
        <Text>{emission}</Text>
        <Text style={styling.units}>{` lbs CO\u2082`}</Text>
      </View>
      {/* Percentage of total emissions */}
      <View style={styling.percentage}>
        <Text>{percentage}</Text>
        <Text style={styling.units}>%</Text>
      </View>
      {/* Recent emissions */}
      <View style={styling.expand}>
        <ExpandIcon
          iconActive={<Ionicons name="chevron-forward" size={13} />}
          iconInactive={<Ionicons name="chevron-down" size={13} />}
        />
      </View>
    </TouchableOpacity>
  );
};

const CategoryContent = ({ category }) => {
  const { expand } = useContext(CategoryContext);

  return <>{expand && <RecentEmissions records={[]} category={category} />}</>;
};

const ExpandIcon = ({ iconActive, iconInactive }) => {
  const { expand } = useContext(CategoryContext);
  return <>{expand ? iconActive : iconInactive}</>;
};

export default Category;