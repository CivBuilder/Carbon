import * as React from 'react';
import MainContainer from './navigation/screens/Main/MainContainer';


// import { Amplify } from 'aws-amplify'
// import awsconfig from './src/aws-exports'
// Amplify.configure(awsconfig)

function App(){
  return (
    <MainContainer /> //links to MainContainer.js in navigation folder
  )
}

export default App;