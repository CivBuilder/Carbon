import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const NetEmissionsCSS = StyleSheet.create({
  netEmissionsGoalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onTrackContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: 15,
  },
  onTrackIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onTrack: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  onTrackText: {
    fontSize: 15,
  },
  currentProgress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  netEmissions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  netEmissionsText: {
    marginEnd: 5,
    fontSize: 15,
  },
  netEmissionsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  units: {
    fontSize: 12,
    marginStart: 3,
    marginBottom: 1,
    alignSelf: 'flex-end',
  }
});
