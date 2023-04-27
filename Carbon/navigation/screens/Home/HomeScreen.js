import { ScrollView, SafeAreaView } from 'react-native';
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
        <Section title="Ranking" shortcutTitle="View Leaderboard" shortcutURL={ScreenNames.RANKING}>
          <HomeScreenRanking />
        </Section>
        {/******* FOR YOU *******/}
        <Section cardView={false} title="For You" shortcutTitle="Learn More" shortcutURL={ScreenNames.FORUM}>
          <ForumCards navigation={navigation} />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};