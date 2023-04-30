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

  function organizeRecords(records) {
    const categories = ["Transport", "Home", "Diet"];
    let recordSet = [];
    for (var entry of records) {
      var record = {};
      for (var category of categories)
        record[category] = entry[`${category.toLowerCase()}_emissions`];
      var date = entry.date;
      var year = date.substring(0, 4);
      var month = date.substring(5, 7);
      var day = date.substring(8);
      var formattedDate = `${month}/${day}/${year}`;
      record["date"] = formattedDate;
      recordSet.push(record);
    };

    return recordSet;
  }

  useEffect(() => {
    async function fetchRecords() {
      const fetchedData = await getRecentEmissions();
      setData(fetchedData);
    }
    fetchRecords();
  }, []);

  const records = organizeRecords(data);

  return (
    <Provider value={value}>
      <CategoryHeader
        id={id}
        title={title}
        emission={emission}
        percentage={percentage}
      />
      <CategoryContent
        records={records}
        category={title}
      />
    </Provider>
  );
};

const CategoryHeader = (props) => {
  const {expand, toggleExpand} = useContext(CategoryContext);
  const {id, title, emission, percentage} = props;

  return (
    <TouchableOpacity onPress={toggleExpand} style={styling.category}>
      {/* Emission Category Title */}
      <View style={styling.title}>
        <Ionicons name={"ellipse"} size={13} style={{ marginEnd: 7, marginTop: 1, color: colorScale[id] }} />
        <Text style={styling.text}>{title}</Text>
      </View>
      {/* Emission Quantity */}
      <View style={styling.emission}>
        <Text style={styling.text}>{emission}</Text>
        <Text style={styling.units}>{` lbs CO\u2082`}</Text>
      </View>
      {/* Percentage of total emissions */}
      <View style={styling.percentage}>
        <Text style={styling.text}>{percentage}</Text>
        <Text style={styling.units}>%</Text>
      </View>
      {/* Recent emissions */}
      <View style={styling.expand}>
        <ExpandIcon
          iconActive={<Ionicons name="chevron-forward" size={13}/>}
          iconInactive={<Ionicons name="chevron-down" size={13}/>}
        />
      </View>
    </TouchableOpacity>
  );
};

const CategoryContent = ({records, category}) => {
  const { expand } = useContext(CategoryContext);

  return <>{expand && <RecentEmissions records={records} category={category} />}</>;
};

const ExpandIcon = ({ iconActive, iconInactive }) => {
  const { expand } = useContext(CategoryContext);
  return <>{expand ? iconActive : iconInactive}</>;
};

export default Category;