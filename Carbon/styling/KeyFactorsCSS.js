import { StyleSheet } from "react-native";

export const KeyFactorsCSS = StyleSheet.create({
  keyFactors: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginVertical: 5
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emission: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  percentage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  units: {
    fontSize: 11,
    marginStart: 1,
    alignSelf: 'flex-end'
  },
});