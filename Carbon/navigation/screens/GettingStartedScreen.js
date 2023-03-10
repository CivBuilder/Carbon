import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const GettingStartedScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} >
        <Image source={{ uri: 'https://i.ibb.co/s9Kfh8p/carbon-logo.png'}} style={{width: 200, height: 100}}/>
      </View>
      <View style={styles.content}>
        <Text>Hello!</Text>
        <Text>
        Take the first step to lowering your carbon emissions and a more eco-friendly lifestyle
        </Text>
      </View>
      {/* Getting started button here */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    
  },
  logo: {
    
  },
  content: {
    
  },
})

export default GettingStartedScreen