import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import ServerErrorScreen from '../../../components/ServerErrorScreen';
import LoadingIndicator from "../../../components/LoadingIndicator";
import { Colors } from "../../../styling/Colors";
import ListPlayers from './ListPlayers';
import getUserScores from './getUserScores';
import MiniRanking from './RankingMiniView';
import SwitchSelector from "react-native-switch-selector";
import { EmissionCategory as EC, ListTabIDs } from './Categories';
import RankingList from './RankingTableClass';
import updateTable from './UpdateTable';
import { useRoute } from '@react-navigation/native';

const PAGE_SIZE = 15;

//For Testing - We must get these when establishing a user session. This data is in the database for testing

export default function RankingScreen({ navigation, route }) {

  /***************************************State Savers***************************************/
  const [userScores, setUserScores] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emission_category, setEmissionCategory] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [leaderboardTables, setLeaderboardTables] = useState(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => new RankingList())));
  const [currentTab, setCurrentTab] = useState(ListTabIDs.PLAYERS_LIKE_YOU);
  const [doneInit, setInitDone] = useState(null);

  route = useRoute();

  // //Default fetch as this tab starts on the Local Score Tab
  // useEffect(() => {
  //   console.log(`Emissions Category updated to: ${emission_category.title}`);
  // }, [emission_category]); // DEBUG
  useEffect(() => {
    setEmissionCategory(route.params);
  }, [route.params]);
  useEffect(() => { getUserScores(setUserScores, setLoading, setErrorMessage); }, []);
  useEffect(() => {
    if (userScores === null) return;

    //Update the "Like you tables based on their rank in that category, update other tables to just be at the start of the list"
    Object.values(EC).forEach((Cat) => {
      updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.PLAYERS_LIKE_YOU, Math.floor(userScores[Cat.title + "ranking"] / PAGE_SIZE), false, setLoading, setErrorMessage);
      updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.TOP_PLAYERS, 0, false, setLoading, setErrorMessage);
      updateTable(setLeaderboardTables, leaderboardTables, Cat, ListTabIDs.WORST_PLAYERS, 0, false, setLoading, setErrorMessage);
    })
    setInitDone(true);
  }, [userScores])

  if (userScores === null) return (
    <View testID='load-screen'>
      <LoadingIndicator loading={loading} testID="loading-screen" />
    </View>
  );

  if (errorMessage !== null) return (
    <View testID='error-screen'>
      <ServerErrorScreen onRefresh={() => { getUserScores(setUserScores, setLoading, setErrorMessage) }} errorMessage={errorMessage} />
      <LoadingIndicator loading={loading} />
    </View>
  );

  return (
    //***** DO NOT DELETE THIS YET -- OLD VERSION *****/
    // // <View style={{ flex: 1 }} testID='rank-screen'>

    //   {/* Header with Toggling Overlay */}
    //   {/* <View style = {{height : 100, backgroundColor : 'white', flexDirection : 'row-reverse'}}>
    //     <View style = {{flex : 0.10, marginRight : 10, justifyContent : 'flex-end', paddingBottom: 15}}>
    //       <RankingCategoryOverlay setEmissionCategory={setEmissionCategory}/>
    //     </View>
    //   </View> */}


    //   {/* <View>
    //     <Section>
    //       <MiniRanking userScores={userScores} rankCategory={emission_category} />
    //     </Section>

    //     <View style={{ margin: 5 }}>
    //       <SwitchSelector
    //         initial={ListTabIDs.PLAYERS_LIKE_YOU}
    //         onPress={value => { setCurrentTab(value) }}
    //         textColor={"white"} //'#7a44cf'
    //         selectedColor={"black"}
    //         buttonColor={"white"}
    //         borderColor={Colors.secondary.DARK_MINT}
    //         backgroundColor={"#0096FF"} //Bright blue
    //         hasPadding={true}
    //         options={[
    //           { label: "Players Like You", value: ListTabIDs.PLAYERS_LIKE_YOU },
    //           { label: "Top Players", value: ListTabIDs.TOP_PLAYERS },
    //           { label: "Worst Players", value: ListTabIDs.WORST_PLAYERS }
    //         ]}
    //         testID='players_cat_tab'
    //         accessibilityLabel="players_cat_tab_label"
    //         animationDuration={150}
    //         height={36}
    //       />
    //     </View>
    //   </View>

    //   <ListPlayers
    //     testID="list"
    //     onRefresh={() => { updateTable(setLeaderboardTables, leaderboardTables, emission_category, currentTab, null, true, setLoading, setErrorMessage) }}
    //     onEndReached={() => { updateTable(setLeaderboardTables, leaderboardTables, emission_category, currentTab, null, false, setLoading, setErrorMessage) }}
    //     table={leaderboardTables[emission_category.id][currentTab].entries}
    //     category={emission_category}
    //     username={userScores.username}
    //   />

    //   <LoadingIndicator loading={loading} />
    // </View> */}

    <SafeAreaView style={{ backgroundColor: '#F7FCF8', height: '100%' }}>
      <View style={styles.rankContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.content}>
            <MiniRanking userScores={userScores} rankCategory={emission_category} />
          </View>
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <SwitchSelector
          initial={ListTabIDs.PLAYERS_LIKE_YOU}
          onPress={value => { setCurrentTab(value) }}
          textColor={"white"} //'#7a44cf'
          selectedColor={Colors.primary.RAISIN_BLACK}
          buttonColor={"white"}
          borderColor={Colors.primary.MINT}
          backgroundColor={Colors.primary.MINT}
          hasPadding={true}
          options={[
            { label: "Players Like You", value: ListTabIDs.PLAYERS_LIKE_YOU },
            { label: "Top Players", value: ListTabIDs.TOP_PLAYERS },
            { label: "Worst Players", value: ListTabIDs.WORST_PLAYERS }
          ]}
          testID='players_cat_tab'
          accessibilityLabel="players_cat_tab_label"
          animationDuration={150}
          height={36}
        />
      </View>
      <ListPlayers
        testID="list"
        onRefresh={() => { updateTable(setLeaderboardTables, leaderboardTables, emission_category, currentTab, null, true, setLoading, setErrorMessage) }}
        onEndReached={() => { updateTable(setLeaderboardTables, leaderboardTables, emission_category, currentTab, null, false, setLoading, setErrorMessage) }}
        table={leaderboardTables[emission_category.id][currentTab].entries}
        category={emission_category}
        username={userScores.username}
      />
      <LoadingIndicator loading={loading} />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  rankContainer: {
    margin: 14,
  },
  cardContainer: {
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
    height: 110,
  },
  tabsContainer: {
    marginTop: 6,
    marginBottom: 13,
    marginHorizontal: 14,
  },
});