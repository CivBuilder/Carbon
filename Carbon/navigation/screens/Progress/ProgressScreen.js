import * as React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { CategoryBreakdown } from './CategoryBreakdown';
import Log from '../Progress/Log';
import NetEmissions from './NetEmissions';
import { Section } from '../../../components/Section';
const margin = 12;

export default function ProgressScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#F7FCF8', height: '100%' }}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >

        {/* Category Breakdown */}
        <Section title="Category Breakdown">
          <CategoryBreakdown navigation={navigation} refreshing={refreshing} setRefreshing={setRefreshing}/>
        </Section>

        {/* Log -- Will update styling and other things for this component soon :) */}
        <Text style={{
          marginHorizontal: 12,
          marginTop: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 16,
          fontWeight: '500',
        }}>Category By Time</Text>
        <View style={styles.container}>
          <Log navigation={navigation} ></Log>
        </View>

        <Section title="Net Emissions">
          <NetEmissions refrshing={refreshing} setRefreshing={setRefreshing} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: margin,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: margin,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  chart: {
    margin: margin,
  },
  button: {
    backgroundColor: Colors.primary.MINT,
    height: 40,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: Colors.primary.MINT_CREAM,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
