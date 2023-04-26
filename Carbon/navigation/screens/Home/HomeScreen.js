import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Platform, Image } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { ScreenNames } from '../Main/ScreenNames';
import { MonthlyFootprintLineChart } from '../../../components/MonthlyFootprintLineChart';
import HomeScreenRanking from '../Ranking/HomeScreenRanking'
import ForumCards from '../../../components/ForumCards';
import { Section } from '../../../components/Section';

// =====================
//     Home Screen
// =====================
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: '#F7FCF8', height: '100%' }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 1 }}

      >
        {/******* CARBON FOOTPRINT SUMMARY *******/}
        <Section height={300} title="This Month's Footprint" shortcutTitle="See More" shortcutURL={ScreenNames.PROGRESS}>
          <MonthlyFootprintLineChart navigation={navigation} />
        </Section>
        {/******* RANKINGS *******/}
        {/* <View>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Rankings</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.RANKING)}>
                <Text style={styles.link}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ backgroundColor: "white", borderRadius: 16, paddingHorizontal: margin / 2 }}>
              <HomeScreenRanking />
            </View>
          </View>
        </View> */}
        <Section title="Ranking" shortcutTitle="View Leaderboard" shortcutURL={ScreenNames.RANKING}>
          <HomeScreenRanking />
        </Section>
        {/******* FOR YOU *******/}
        <View>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>For You</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.FORUM)}>
                <Text style={styles.link}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.container}> */}
          <View style={{ height: 350 }}>
            <ForumCards navigation={navigation} />
          </View>
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 12;

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
    marginHorizontal: margin,
    marginTop: margin,
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  cardContainer: {
    marginBottom: 10,
  },
  link: {
    color: Colors.primary.MINT,
    fontSize: 14,
    fontWeight: '500',
  }
});