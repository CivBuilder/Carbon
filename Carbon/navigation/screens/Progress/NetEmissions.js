import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getPreviousMonthEmissions, getPreviousMonthLifestyleEmissions } from '../../../util/Goals';
import LottieView from 'lottie-react-native';
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

  return (
    <View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: '400', textAlign:'center'}}>
          By recycling, you saved <Text style={{fontSize: 20, fontWeight: '500'}}>{`${lifestyleEmissions}`}</Text> lbs of {`CO\u2082`}
        </Text>
        <Text style={{fontSize: 16, fontWeight: '400', textAlign:'center'}}> from the atmosphere last month.</Text>
      </View>
      <LottieView style={{flex: 1, height: 200, margin: 8}} source={require('../../../assets/lotties/recyclepeople.json')} autoPlay loop />
      <View style={{marginTop: 6}}>
        <Text style={{fontSize: 16, fontWeight: '400', textAlign:'center'}}>
          Your net emissions is <Text style={{fontSize: 20, fontWeight: '500'}}>{`${lastMonthEmissions - lifestyleEmissions}`}</Text> lbs of {`CO\u2082`} this month.
        </Text>
      </View>
    </View>
  );
}

export default NetEmissions;