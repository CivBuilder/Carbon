import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const SectionCSS = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 14,
    marginBottom: 14,
  },
  header: {
    marginHorizontal: 14,
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  shortcut: {
    color: Colors.primary.MINT,
    fontSize: 13,
    fontWeight: '400',
  },
  body: {
    backgroundColor: "white",
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.RAISIN_BLACK,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.125,
        shadowRadius: 2.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    margin: 15,
  },
});
