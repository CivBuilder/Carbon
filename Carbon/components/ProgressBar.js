import { View, StyleSheet, Animated, Text } from 'react-native';
import React from 'react';
import { Colors } from '../styling/Colors.js';
import { useEffect } from 'react';
import { useRef, useState } from 'react';

/**
 * Displays Animated progress bar where progress/total % will be filled in
 * @param {Number} progress - progress towards total value, % will fill the bar
 * @param {Number} total - total value to be me
 */
export default function RankProgressBar({ progress, total }) {
  const [ratio, setRatio] = useState(progress === total ? 1 : progress / total);
  const [barWidth, setWidth] = useState(0);
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  useEffect(() => {
    setRatio(progress === total ? 1 : progress / total)
  }, [progress, total])
  const initWidth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(initWidth, {
      toValue: ratio * barWidth,
      bounciness: 5,
      speed: 2,
      useNativeDriver: false
    }).start();
  }, [ratio, barWidth]);

  return (
    <View style={styles.RankProgBarContainer}>
      {(progress !== total) &&
        <View onLayout={onLayout}>
          <View style={[styles.loadingBar, { width: barWidth }]}>
            <Animated.View style={[styles.progressBar, { width: initWidth }]} />
          </View>
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
    minWidth: '100%',
    minHeight: 10,
    borderRadius: 15,
    backgroundColor: "#DDE1E4",
    flex: 0.25,
    overflow: 'hidden'
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