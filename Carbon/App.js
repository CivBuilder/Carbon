import * as React from 'react';
import { ScreenDimensionsProvider } from './hooks/ScreenDimensionsProvider';
import MainContainer from './navigation/screens/Main/MainContainer';
import { ToastProvider } from 'react-native-toast-notifications';
import { Colors } from './styling/Colors';

// THIS TURNS OFF ALL WARNINGS!! USE WITH CAUTION
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();

function App() {
  return (
    //links to MainContainer.js in navigation folder
    <ScreenDimensionsProvider>
      <ToastProvider
        successColor= {Colors.alertTypes.SUCCESS}
        dangerColor= {Colors.alertTypes.ERROR}
        warningColor= {Colors.alertTypes.WARNING}
        normalColor={Colors.alertTypes.GRAY}
        offsetTop={40}
        textStyle= {{fontSize: 16, color: Colors.primary.RAISIN_BLACK, fontWeight: '400', textAlign: 'center', paddingHorizontal: 12}}
        placement= 'top'
        duration= {3000}
        animationType= 'slide-in'
        swipeEnabled= {true}
      >
        <MainContainer />
      </ToastProvider>
    </ScreenDimensionsProvider>
  )
}

export default App;