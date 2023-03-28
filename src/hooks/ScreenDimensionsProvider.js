import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const ScreenDimensionsContext = createContext(null);

export const useScreenDimensions = () => useContext(ScreenDimensionsContext);

export const ScreenDimensionsProvider = ({ children }) => {
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setScreenDimensions(window);
    };
    Dimensions.addEventListener('change', handleDimensionsChange);
    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  }, []);

  return (
    <ScreenDimensionsContext.Provider value={screenDimensions}>
      {children}
    </ScreenDimensionsContext.Provider>
  );
};
