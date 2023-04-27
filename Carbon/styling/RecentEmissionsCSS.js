import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const RecentEmissionsCSS = StyleSheet.create({
  recentEmissions: {
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: Colors.miscellaneous.BACKGROUND,
    borderRadius: 8,
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    margin: 3,
  },
  emission: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  units: {
    fontSize: 11,
    marginStart: 1,
    alignSelf: 'flex-end'
  },
  value: {
    fontSize: 13,
  },
  empty: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notFound: {
    fontSize: 13,
    fontStyle: 'italic',
    color: Colors.miscellaneous.DISABLED,
  },
});
