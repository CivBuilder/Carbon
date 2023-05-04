import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const NetEmissionsCSS = StyleSheet.create({
  netEmissionsGoalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  netEmissionsGoalContainerNoProgressBar: {
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
  },
  noGoalContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  onTrackTextNoProgressBar: {
    fontSize: 18
  },
  onTrackText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  noGoalText: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 10,
  },
  currentProgress: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
