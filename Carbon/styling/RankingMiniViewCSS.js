import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const RankingMiniViewCSS = StyleSheet.create({
  rankLeaderboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  leaderboardContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  rankTitleProgressContainer: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 15,
  },
  rankImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  rankTitle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  rankProgress: {
    flex: 2,
  },
  leaderboardRank: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboardText: {
    marginEnd: 5,
    fontSize: 15,
  },
  leaderboardValue: {
    fontSize: 16,
    fontWeight: '600',
  }
});
