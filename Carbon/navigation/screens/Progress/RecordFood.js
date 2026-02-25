import React, { useEffect, useState, useMemo } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { ScreenNames } from '../Main/ScreenNames';
import calcBeef  from '../../../calculations/food_calculations/calcBeef'
import calcCheese from '../../../calculations/food_calculations/calcCheese'
import calcPork from '../../../calculations/food_calculations/calcPork'
import calcPoultry from '../../../calculations/food_calculations/calcPoultry'
import calcRice from '../../../calculations/food_calculations/calcRice'
import calcTofu from '../../../calculations/food_calculations/calcTofu'
import calcBeans from '../../../calculations/food_calculations/calcBeans'
import calcLentils from '../../../calculations/food_calculations/calcLentils'
import calcVegetables from '../../../calculations/food_calculations/calcVegetables'
import calcFruit from '../../../calculations/food_calculations/calcFruit'
import calcNuts from '../../../calculations/food_calculations/calcNuts'
import calcBread from '../../../calculations/food_calculations/calcBread'
import calcPotatoes from '../../../calculations/food_calculations/calcPotatoes'
import calcPasta from '../../../calculations/food_calculations/calcPasta'
import { validateFoodEntry } from '../../../util/RecordEmissionChecks';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../styling/RecordEmissionsCSS';

const RecordFood = ({ navigation, route }) => {
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [beefConsumption, setBeefConsumption] = useState(0);
  const [cheeseConsumption, setCheeseConsumption] = useState(0);
  const [porkConsumption, setPorkConsumption] = useState(0);
  const [poultryConsumption, setPoultryConsumption] = useState(0);
  const [riceConsumption, setRiceConsumption] = useState(0);
  const [tofuConsumption, setTofuConsumption] = useState(0);
  const [beansConsumption, setBeansConsumption] = useState(0);
  const [lentilsConsumption, setLentilsConsumption] = useState(0);
  const [vegetablesConsumption, setVegetablesConsumption] = useState(0);
  const [fruitConsumption, setFruitConsumption] = useState(0);
  const [nutsConsumption, setNutsConsumption] = useState(0);
  const [breadConsumption, setBreadConsumption] = useState(0);
  const [potatoesConsumption, setPotatoesConsumption] = useState(0);
  const [pastaConsumption, setPastaConsumption] = useState(0);
  const [emissionsEntry, setEmissionsEntry] = useState();
  const [funFact, setFunFact] = useState('');
  const funFacts = [
    "The average American diet generates approximately 2.5 metric tons of carbon dioxide emissions per year.",
    "A plant-based diet can reduce your food carbon footprint by up to 73% compared to a meat-heavy diet.",
    "The production of cheese generates more carbon emissions per kilogram than the production of chicken or pork.",
    "The transportation of food accounts for only 11% of the food system's emissions, while the production of food accounts for 83% of emissions.",
    "Eating locally sourced, seasonal produce can reduce carbon emissions from transportation and refrigeration.",
    "Beef produces 60 lbs of CO\u2082 per lb consumed, while lentils produce less than 1 lb of CO\u2082 per lb consumed.",
    "Switching from beef to beans for one meal can save over 58 lbs of CO\u2082 emissions per pound of food.",
  ];

  function getRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  }
  //Calculate the total amount of emissions from the food consumption
  function calcConsumption() {
    const beef = calcBeef(beefConsumption)
    const cheese = calcCheese(cheeseConsumption)
    const pork = calcPork(porkConsumption)
    const poultry = calcPoultry(poultryConsumption)
    const rice = calcRice(riceConsumption)
    const tofu = calcTofu(tofuConsumption)
    const beans = calcBeans(beansConsumption)
    const lentils = calcLentils(lentilsConsumption)
    const vegetables = calcVegetables(vegetablesConsumption)
    const fruit = calcFruit(fruitConsumption)
    const nuts = calcNuts(nutsConsumption)
    const bread = calcBread(breadConsumption)
    const potatoes = calcPotatoes(potatoesConsumption)
    const pasta = calcPasta(pastaConsumption)
    return beef + cheese + pork + poultry + rice + tofu + beans + lentils + vegetables + fruit + nuts + bread + potatoes + pasta
  }
  //set the fun fact when the component mounts
  useEffect(() => {
    setFunFact(getRandomFunFact());
  }, []);

  //memoize the fun fact so it doesn't change when the state variable changes
  const memoizedFunFact = useMemo(() => funFact, [funFact]);

  // Call setTotalConsumption when the consumption state variables change
  useEffect(() => {
    const newTotalConsumption = calcConsumption();
    // console.log('total consumption: ', newTotalConsumption, 'lbs')
    setTotalConsumption(newTotalConsumption);
  }, [beefConsumption, cheeseConsumption, porkConsumption, poultryConsumption,
      riceConsumption, tofuConsumption, beansConsumption, lentilsConsumption,
      vegetablesConsumption, fruitConsumption, nutsConsumption, breadConsumption,
      potatoesConsumption, pastaConsumption]);

  //Update our parameter to send back when the consumption state variable changes
  useEffect( () => {
    //need to check if route is undefined for testing purposes
    if(totalConsumption !== 0 && route !== undefined) {
      setEmissionsEntry({
        ...route.params.sentEmissionsEntry,
        diet_emissions:totalConsumption
    })
    }
  }, [totalConsumption])

  // Check if any food input has a value > 0
  const hasAnyInput = () => {
    const allConsumptions = [
      beefConsumption, cheeseConsumption, porkConsumption, poultryConsumption,
      riceConsumption, tofuConsumption, beansConsumption, lentilsConsumption,
      vegetablesConsumption, fruitConsumption, nutsConsumption, breadConsumption,
      potatoesConsumption, pastaConsumption
    ];
    return allConsumptions.some(c => c.length > 0) &&
      allConsumptions.reduce((sum, c) => sum + parseFloat(c || 0), 0) > 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        <View style={styles.funfact}>
          <Text style={styles.header}>Did you know?</Text>
          <Text style={styles.label}>{memoizedFunFact}</Text>
        </View>
        <Text style={styles.header}>Log your food intake for today</Text>
        <View style={styles.pickercontainer}>

          {/* Animal Products Section */}
          <Text style={styles.header}>Animal Products</Text>

          <View style={styles.label_container}>
            <FontAwesome5 name="hamburger" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Red Meat</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(beef) => setBeefConsumption(beef.length > 0 ? beef : 0)}
            testID='red-meat-input'
          />

          <View style={styles.label_container}>
            <FontAwesome5 name="cheese" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Cheese</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(cheese)=> setCheeseConsumption(cheese.length > 0 ? cheese : 0)}
            testID='cheese-input'
          />

          <View style={styles.label_container}>
            <FontAwesome5 name="bacon" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Pork</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(pork) => setPorkConsumption(pork.length > 0 ? pork : 0)}
            testID='pork-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="egg" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Poultry</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always' //iOS only
            onChangeText={(poultry) => setPoultryConsumption(poultry.length > 0 ? poultry : 0)}
            testID='poultry-input'
          />

          {/* Plant-Based Foods Section */}
          <Text style={styles.header}>Plant-Based Foods</Text>

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="rice" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Rice</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(rice) => setRiceConsumption(rice.length > 0 ? rice : 0)}
            testID='rice-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="food-variant" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Tofu</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(tofu) => setTofuConsumption(tofu.length > 0 ? tofu : 0)}
            testID='tofu-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="seed" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Beans</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(beans) => setBeansConsumption(beans.length > 0 ? beans : 0)}
            testID='beans-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="seed-outline" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Lentils</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(lentils) => setLentilsConsumption(lentils.length > 0 ? lentils : 0)}
            testID='lentils-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="carrot" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Vegetables</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(veg) => setVegetablesConsumption(veg.length > 0 ? veg : 0)}
            testID='vegetables-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="fruit-cherries" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Fruit</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(fruit) => setFruitConsumption(fruit.length > 0 ? fruit : 0)}
            testID='fruit-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="peanut" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Nuts</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(nuts) => setNutsConsumption(nuts.length > 0 ? nuts : 0)}
            testID='nuts-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="bread-slice" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Bread</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(bread) => setBreadConsumption(bread.length > 0 ? bread : 0)}
            testID='bread-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="food-apple" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Potatoes</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(potatoes) => setPotatoesConsumption(potatoes.length > 0 ? potatoes : 0)}
            testID='potatoes-input'
          />

          <View style={styles.label_container}>
            <MaterialCommunityIcons name="pasta" size={32} color="black" style={styles.icon}/>
            <Text style={styles.text_input_label}>Pasta</Text>
          </View>
          <TextInput
            placeholder='lbs'
            style={styles.text_input}
            keyboardType="decimal-pad"
            clearButtonMode='always'
            onChangeText={(pasta) => setPastaConsumption(pasta.length > 0 ? pasta : 0)}
            testID='pasta-input'
          />

        {hasAnyInput() && (
          <View style={{flex:1, justifyContent:'flex-end'}}>
          <TouchableOpacity testID ='save-button' style={styles.button} onPress={() => validateFoodEntry(beefConsumption, porkConsumption, cheeseConsumption, poultryConsumption, riceConsumption, tofuConsumption, beansConsumption, lentilsConsumption, vegetablesConsumption, fruitConsumption, nutsConsumption, breadConsumption, potatoesConsumption, pastaConsumption) ? navigation.navigate(ScreenNames.RECORD_EMISSION, {returningEmissionsEntry : emissionsEntry}) : alert("Each entry must be a number between 0 and 10.")}>
            <Text style={styles.buttonText}>Save & Return</Text>
          </TouchableOpacity>
          </View>
        )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordFood;
