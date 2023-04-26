import { View, Text, StyleSheet, Image, ImageBackground,Button } from 'react-native'
import React, {useEffect} from 'react'
import { Colors } from '../../../styling/Colors'

//Get Started Screen
//Taken from Janeen (author of code)
const StartScreen = ({navigation}) => {
  useEffect(()=>{
      navigation.setOptions({
      header: ()=>(
          <View style={{
          position: "absolute",
          top:0,
          height:40,
          borderRadius: 6,
          width:0,
          backgroundColor: Colors.secondary.CELADON,
          }}>
          </View>
      ),
      });
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/get-started-background.png')} style={styles.background}>
        <View style={styles.logo} >
          <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}}/>
        </View>
        <View style={styles.content}>
          <Text style={styles.helloText}>Hello!</Text>
          <Text style={styles.body}>
            Take the first step to lowering your carbon emissions and a more eco-friendly lifestyle
          </Text>
        <View style={{
            justifyContent:'center',
            flexDirection:"row",
        }}>
        <View style={{width:'100%',marginTop:15}}>
        <Button
        title="Start Questionnaire"
        color={Colors.primary.MINT}
        onPress={() =>{
            navigation.navigate("q1");
        }}
        />
        </View>
        </View>
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.secondary.DARK_MINT,
  },
  body: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    color: Colors.secondary.DARK_MINT,
    textAlign: 'center',
  },
  loginText: {
    fontFamily: 'sans-serif',
    color: Colors.primary.MINT,

  },
})

export default StartScreen