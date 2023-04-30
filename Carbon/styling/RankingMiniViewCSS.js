import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const RankingMiniViewCSS = StyleSheet.create({
  rankLeaderboardContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  rankImageContainer: {
    display: 'flex',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankingContainer: {
    display: 'flex',
    flex: 6,
    flexDirection: 'column',
  },
  gap: {
    flex: 1,
  },
  profileImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  rankTitle: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
  },
  rankProgress: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leaderboardRank: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  leaderboardText: {
    marginEnd: 5,
    fontSize: 19,
  },
  leaderboardValue: {
    fontSize: 20,
    fontWeight: '600',
  }
});
