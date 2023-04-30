import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getPreviousMonthEmissions, getPreviousMonthLifestyleEmissions } from '../../../util/Goals';
import { NetEmissionsCSS as styling } from '../../../styling/NetEmissionsCSS';
import RankProgressBar from '../../../components/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../styling/Colors';

const NetEmissions = () => {
  const [lastMonthEmissions, setLastMonthEmissions] = useState(0);
  const [lifestyleEmissions, setLifestyleEmissions] = useState(0);

  useEffect(() => {
    const fetchEmissions = async () => {
      const lastMonthTotalEmissions = await getPreviousMonthEmissions();
      setLastMonthEmissions(lastMonthTotalEmissions);

      const lastMonthLifestyleEmissions = await getPreviousMonthLifestyleEmissions();
      setLifestyleEmissions(lastMonthLifestyleEmissions);
    };
    fetchEmissions();
  }, []);

  const debugGoalValue = 100;
  const debugOnTrack = true;

  return (
    <View>
      <View style={{marginBottom: 12}}>
        <Text style={{fontSize: 16, fontWeight: '400', textAlign:'center'}}>
          By recycling, you saved <Text style={{fontSize: 20, fontWeight: '500'}}>{`${lifestyleEmissions}`}</Text> lbs of {`CO\u2082`}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', textAlign:'center'}}> from the atmosphere last month.</Text>
      </View>
      <View>
        <Text style={{fontSize: 16, fontWeight: '400', textAlign:'center'}}>
          Your net emissions is <Text style={{fontSize: 20, fontWeight: '500'}}>{`${lastMonthEmissions - lifestyleEmissions}`}</Text> lbs of {`CO\u2082`} this month.
        </Text>
      </View>
    </View>

    /***
     * NEW VERSION MOCKUP -- DISABLED UNTIL FINISHED AT A LATER TIME (Adam V.)
    ***/
    // <View style={styling.netEmissionsGoalContainer}>
    //   {debugOnTrack !== undefined ?
    //     <View style={styling.onTrackContainer}>
    //       <View style={styling.onTrackIcon}>
    //         {debugOnTrack ? <Ionicons name="checkmark-circle" size={48} color={Colors.secondary.LIGHT_MINT}/>
    //                       : <Ionicons name="close-circle" size={48} color={Colors.secondary.RED}/>}
    //       </View>
    //       <View style={styling.onTrack}>
    //         <Text style={styling.onTrackText}>You {debugOnTrack ? "are" : "are not"} on track to lowering your emissions this month.</Text>
    //       </View>
    //     </View> :
    //     <></>
    //   }
    //   <View style={styling.currentProgress}>
    //     <RankProgressBar progress={lifestyleEmissions} total={debugGoalValue} barWidth={0.8} />
    //   </View>
    //   <View style={styling.netEmissions}>
    //     <Text style={styling.netEmissionsText}>Your net emissions for this month:</Text>
    //     <Text style={styling.netEmissionsValue}>{`${lastMonthEmissions - lifestyleEmissions}`}</Text>
    //     <Text style={styling.units}>{`lbs CO\u2082`}</Text>
    //   </View>
    // </View>
  );
}

export default NetEmissions;