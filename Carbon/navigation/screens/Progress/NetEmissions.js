import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getPreviousMonthEmissions, getPreviousMonthLifestyleEmissions } from '../../../util/Goals'

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
      <Text>{`By recycling, you saved ${lifestyleEmissions} pounds of C02 from the atmosphere in the last month.`}</Text>
      <Text>{`Your net emissions for this month is ${lastMonthEmissions - lifestyleEmissions} pounds of C02`}</Text>
    </View>
  )
}

export default NetEmissions