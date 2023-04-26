import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const SectionCSS = StyleSheet.create({
  container: {
    margin: 10,
  },
  header: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  shortcut: {
    color: Colors.primary.MINT,
    fontSize: 12,
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
