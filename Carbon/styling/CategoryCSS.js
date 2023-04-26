import { StyleSheet } from "react-native";

export const CategoryCSS = StyleSheet.create({
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    margin: 7,
  },
  title: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emission: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  percentage: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  units: {
    fontSize: 11,
    marginStart: 1,
    alignSelf: 'flex-end'
  },
  expand: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});