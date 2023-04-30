import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../../styling/Colors';
import RankProgressBar from '../../../components/ProgressBar';
import { NetEmissionsCSS as styling } from '../../../styling/NetEmissionsCSS';
import { ScreenNames } from '../Main/ScreenNames';
import { getGoalProgress, getLastCalendarMonthEmissions, getThisCalendarMonthEmissions, getCurrentGoal } from '../../../util/Goals'
import { Ionicons } from '@expo/vector-icons';
const GoalProgress = ({ refreshing, setRefreshing, navigation }) => {
    const [lastMonthEmissions, setLastMonthEmissions] = useState(0);
    const [thisMonthEmissions, setThisMonthEmissions] = useState(0);
    const [thisMonthGoalEmissions, setThisMonthGoalEmissions] = useState(0);
    const [goal, setGoal] = useState(0);
    const [onTrackThisMonth, setOnTrackThisMonth] = useState(false);
    const [initialStart, setInitialStart] = useState(true);

    useEffect(() => {
        if (refreshing || initialStart) {
            const fetchEmissions = async () => {
                const lastMonthTotalEmissions = await getLastCalendarMonthEmissions();
                setLastMonthEmissions(lastMonthTotalEmissions);

                const thisMonthTotalEmissions = await getThisCalendarMonthEmissions();
                setThisMonthEmissions(thisMonthTotalEmissions);

                const res = await getCurrentGoal();
                const goal = res.goal;
                setGoal(goal);

                const goalProgress = await getGoalProgress();
                setOnTrackThisMonth(goalProgress);

                // Calculate the goal progress
                const factor = 1 - (goal / 100); // Calculate the factor to multiply the days by to get the goal for that day
                const thisMonthGoalEmissions = factor * lastMonthEmissions;
                setThisMonthGoalEmissions(thisMonthGoalEmissions);
            };
            fetchEmissions();
            setRefreshing(false);
            setInitialStart(false);
        }
    }, [initialStart, refreshing, setRefreshing]);

    // Convert the goal value to a number using the Number() function
    const goalNumber = Number(goal);
    const thisMonthTotalNumber = Number(thisMonthEmissions);
    const thisMonthGoalNumber = Number(thisMonthGoalEmissions);


    // Compare the goal number to zero
    if (goalNumber === 0) {
        // Display the "no goal set" message
        return (
            <View style={styling.noGoalContainer}>
                <View style={styling.onTrack}>
                    <Text style={styling.noGoalText}>You do not have a goal set for this month, please set one to track your progress.</Text>
                </View>
                <TouchableOpacity testID="add-goal-button" onPress={() => navigation.navigate(ScreenNames.ADD_GOAL)}>
                    <View style={{ backgroundColor: Colors.primary.MINT, padding: 10, marginTop: 12, borderRadius: 12 }}>
                        <Text testID="add-goal-text" style={{ color: Colors.primary.MINT_CREAM, fontWeight: 'bold', fontSize: 18 }}>Add Goal</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    } else {
        // Display the goal progress information
        return (
            <View style={styling.netEmissionsGoalContainer}>
                <View style={styling.onTrackContainer}>
                    <View style={styling.onTrackIcon}>
                        {onTrackThisMonth ? <Ionicons name="checkmark-circle" size={48} color={Colors.secondary.LIGHT_MINT} />
                            : <Ionicons name="close-circle" size={48} color={Colors.secondary.RED} />}
                    </View>
                    <View style={styling.onTrack}>
                        <Text style={thisMonthTotalNumber < thisMonthGoalNumber ? styling.onTrackText :  styling.onTrackTextNoProgressBar}>You {onTrackThisMonth ? "are on track to meeting your goal this month. Great job!" : "are not on track to meet your goal this month."}</Text>
                    </View>
                </View>
                {thisMonthTotalNumber < thisMonthGoalNumber && (
                    <View style={styling.currentProgress}>
                        <RankProgressBar progress={thisMonthTotalNumber} total={thisMonthGoalNumber} barWidth={0.5} />
                    </View>
                )}
            </View>
        );

    }
}

export default GoalProgress