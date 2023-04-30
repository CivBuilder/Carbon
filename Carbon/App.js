import * as React from 'react';
import { ScreenDimensionsProvider } from './hooks/ScreenDimensionsProvider';
import MainContainer from './navigation/screens/Main/MainContainer';

// THIS TURNS OFF ALL WARNINGS!! USE WITH CAUTION
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();

function App() {
  return (
    //links to MainContainer.js in navigation folder
    <ScreenDimensionsProvider>
      <MainContainer />
    </ScreenDimensionsProvider>
  )
}

export default App;