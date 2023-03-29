import * as React from 'react';
import { ScreenDimensionsProvider } from './hooks/ScreenDimensionsProvider';
import MainContainer from './navigation/screens/Main/MainContainer';

function App() {
  return (
    //links to MainContainer.js in navigation folder
    <ScreenDimensionsProvider>
      <MainContainer />
    </ScreenDimensionsProvider>
  )
}

export default App;