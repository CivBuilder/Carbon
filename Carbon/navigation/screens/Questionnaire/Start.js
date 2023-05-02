import { View, Text, StyleSheet, Image, ImageBackground, Animated, TouchableOpacity } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { Colors } from '../../../styling/Colors'

const CarbonLogo = ({ onLogoAnimationFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      delay: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Call the onLogoAnimationFinish callback when the logo animation is finished
      onLogoAnimationFinish();
    });
  }, [fadeAnim, onLogoAnimationFinish]);

  return (
    <Animated.View style={[styles.logo, { opacity: fadeAnim }]}>
      <Image
        source={require('../../../assets/Carbon_Logo.png')}
        style={{ width: 260, height: 130, resizeMode: 'contain' }}
      />
    </Animated.View>
  );
};

// Get Started Screen
// Taken from Janeen (author of code)
const StartScreen = ({ navigation }) => {
  const [isAnimationRunning, setIsAnimationRunning] = useState(true);

  const helloFadeAnim = useRef(new Animated.Value(0)).current;
  const bodyFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  const handleLogoAnimationFinish = () => {
    // Trigger the animation of the "Hello!" text
    Animated.timing(helloFadeAnim, {
      toValue: 1,
      duration: 690,
      useNativeDriver: true,
    }).start(() => {
      // Trigger the animation of the body text after the "Hello!" text has finished animating
      Animated.timing(bodyFadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        // Trigger the animation of the button after the body text has finished animating
        Animated.timing(buttonFadeAnim, {
          toValue: 1,
          duration: 690,
          delay: 690,
          useNativeDriver: true,
        }).start(() => {
          setIsAnimationRunning(false);
        });
      });
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/get-started-background.png')}
        style={styles.background}
      >
        <CarbonLogo onLogoAnimationFinish={handleLogoAnimationFinish} />
        <View style={styles.content}>
          <Animated.Text style={[styles.helloText, { opacity: helloFadeAnim }]}>
            Hello!
          </Animated.Text>
          <Animated.Text style={[styles.body, { opacity: bodyFadeAnim }]}>
            Take the first step to lowering your carbon emissions and a more eco-friendly lifestyle.
          </Animated.Text>
          <Animated.View style={{ opacity: buttonFadeAnim }}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={isAnimationRunning ? null : () => navigation.navigate('q1')}
              disabled={isAnimationRunning}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    fontSize: 36,
    marginBottom: 14,
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
  button: {
    marginTop: 36,
    backgroundColor: Colors.primary.MINT,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    width: '80%',
  },
  buttonText: {
    fontFamily: 'sans-serif',
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
})

export default StartScreen