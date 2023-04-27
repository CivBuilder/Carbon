import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import React from 'react';
import { Colors } from '../styling/Colors.js';
import { useEffect } from 'react';
import { useRef } from 'react';

/**
 * Displays Animated progress bar where progress/total % will be filled in
 * @param {Number} progress - progress towards total value, % will fill the bar
 * @param {Number} total - total value to be me
 */
export default function RankProgressBar({ progress, total, widthRatio }) {
  const barWidth = Dimensions.get("window").width * widthRatio;
  const initWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(initWidth, {
      toValue: (progress / total) * barWidth,
      bounciness: 10,
      speed: 2,
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <View style={styles.RankProgBarContainer}>
      {(progress !== total) &&
        <View style={[styles.loadingBar, { width: barWidth }]}>
          <Animated.View style={[styles.progressBar, { width: initWidth }]} />
        </View>
      }
      <View style={styles.progressValues}>
        <Text style={styles.numerator}>{progress} </Text>
        {(progress !== total) && <Text style={styles.denominator}>{total}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  RankProgBarContainer: {
    flex: 1,
    // justifyContent : 'flex-end'
  },
  loadingBar: {
    borderRadius: 15,
    backgroundColor: "#DDE1E4",
    flex: 0.25,
  },
  progressBar: {
    backgroundColor: Colors.secondary.LIGHT_MINT,
    width: 0,
    height: 10,
    borderRadius: 15,
    flex: 1
  },
  progressValues: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 2,
    marginTop: 2,
  },
  numerator: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.secondary.DARK_MINT
  },
  denominator: {
    fontSize: 14,
    fontWeight: '600',
  },
});