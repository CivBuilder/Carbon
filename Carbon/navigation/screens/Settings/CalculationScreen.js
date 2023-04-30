import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'
import React from 'react'
import { Colors } from '../../../styling/Colors'
import {WebView} from 'react-native-webview'

const CalculationScreen = () => {
    const handleClick = (link) => {
        Linking.openURL(link)
    }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.generalText}>What the values mean</Text>
      <Text style={styles.subheading}>Transport</Text>
      <Text style={styles.bodyText}>The transport value shows the estimated amount of CO2 emissions from your transportation. This includes emissions from cars, buses, trains, bikes, and airplanes.</Text>
      <Text style={styles.subheading}>Diet</Text>
      <Text style={styles.bodyText}>The diet value shows the estimated amount of CO2 emissions from the food you eat. This includes emissions from the production, processing, and transportation of your food.</Text>
      <Text style={styles.subheading}>Home</Text>
      <Text style={styles.bodyText}>The home value shows the estimated amount of CO2 emissions from your home electricity usage. This includes emissions from the production of electricity, as well as any emissions associated with heating or cooling your home.</Text>
      <Text style={styles.subheading}>Total Emissions</Text>
      <Text style={styles.bodyText}>The total emissions value shows the total estimated amount of CO2 emissions saved from your home, diet, and transportation emissions. </Text>
      <Text style={styles.subheading}>Saved Emissions</Text>
      <Text style={styles.bodyText}>The saved emissions value shows the estimated amount of CO2 emissions saved from recycling. This includes emissions saved from recycling glass, metal, paper, and plastic </Text>
      <Text style={styles.subheading}>Net Emissions</Text>
      <Text style={styles.bodyText}>The net emissions value shows your total estimated amount of CO2 emissions minus your saved emissions.</Text>

      <Text style={styles.generalText}>How we calculate them</Text>
      <Text style={styles.subheading}>Bike</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.sciencedirect.com/science/article/pii/S0959378021000030')}>
        https://www.sciencedirect.com/science/article/pii/S0959378021000030
      </Text>
      <Text style={styles.subheading}>Car Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references')}>
        https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
      </Text>
      <Text style={styles.subheading}>Electric Car Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://climate.mit.edu/ask-mit/are-electric-vehicles-definitely-better-climate-gas-powered-cars#:~:text=The%20researchers%20found%20that%2C%20on,vehicle%20created%20just%20200%20grams')}>
        https://climate.mit.edu/ask-mit/are-electric-vehicles-definitely-better-climate-gas-powered-cars#:~:text=The%20researchers%20found%20that%2C%20on,vehicle%20created%20just%20200%20grams
      </Text>
      <Text style={styles.subheading}>Plane Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.sciencedirect.com/science/article/pii/S0959378021000030')}>
        https://www.sciencedirect.com/science/article/pii/S0959378021000030
      </Text>
      <Text style={styles.subheading}>Bus Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://blueskymodel.org/air-mile')}>
        https://blueskymodel.org/air-mile
      </Text>
      <Text style={styles.subheading}>Train Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://blueskymodel.org/air-mile')}>
        https://blueskymodel.org/air-mile
      </Text>
      <Text style={styles.subheading}>Home Electricity Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references')}>
        https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references
      </Text>
      <Text style={styles.subheading}>Beef Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/')}>
        https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/
      </Text>
      <Text style={styles.subheading}>Cheese Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/')}>
        https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/
      </Text>
      <Text style={styles.subheading}>Poultry Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/')}>
        https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/
      </Text>
      <Text style={styles.subheading}>Pork Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/')}>
        https://8billiontrees.com/carbon-offsets-credits/carbon-ecological-footprint-calculators/food/
      </Text>
      <Text style={styles.subheading}>Glass Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data')}>
        https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data
      </Text>
      <Text style={styles.subheading}>Metal Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data')}>
        https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data
      </Text>
      <Text style={styles.subheading}>Paper Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data')}>
        https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data
      </Text>
      <Text style={styles.subheading}>Plastic Calculations</Text>
      <Text style={styles.linkText} 
        onPress={() => handleClick('https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data')}>
        https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/paper-and-paperboard-material-specific-data
      </Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary.MINT_CREAM,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    generalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary.RAISIN_BLACK,
        textAlign: 'center',
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
      },
      bodyText: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
      },
      linkText: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
        color: 'blue',
      }
});
export default CalculationScreen