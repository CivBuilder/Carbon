import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecordRecycling from '../../navigation/screens/Progress/RecordRecycling';
import { ScreenNames } from '../../navigation/screens/Main/ScreenNames';
import { Alert } from 'react-native';
describe('RecordRecycling', () => {
    let navigation, route, component;
    beforeEach(() => {
      navigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
    };
    route = {
      params: {
          transport_emissions: 0,
          total_emissions: 0,
          lifestyle_emissions: 0,
          diet_emissions: 0,
          home_emissions: 0,
      },
    };
  
    });
    it('should render correctly', () => {
        const { getByText } = render(<RecordRecycling navigation={navigation} route={route} />);
        expect(getByText('Log each material you recycled today')).toBeTruthy();
    }); 
    
    it('should navigate to RecordEmission with params for paper', () => {
        const { getByTestId } = render(<RecordRecycling navigation={navigation} route={route} />);
        const lm = {"lifestyle_emissions": 9}
        const paperPicker = getByTestId('paper-input');
        fireEvent.changeText(paperPicker, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}
        );
    });
    it('should navigate to RecordEmission with params for plastic', () => {
        const { getByTestId } = render(<RecordRecycling navigation={navigation} route={route} />);
        const lm = {"lifestyle_emissions": 9}
        const plasticPicker = getByTestId('plastic-input');
        fireEvent.changeText(plasticPicker, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}
        );
    }
    );
    it('should navigate to RecordEmission with params for glass', () => {
        const { getByTestId } = render(<RecordRecycling navigation={navigation} route={route} />);
        const lm = {"lifestyle_emissions": 6}
        const glassPicker = getByTestId('glass-input');
        fireEvent.changeText(glassPicker, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}
        );
    }
    );
    it('should navigate to RecordEmission with params for metal', () => {
        const { getByTestId } = render(<RecordRecycling navigation={navigation} route={route} />);
        const lm = {"lifestyle_emissions": 4}
        const metalPicker = getByTestId('metal-input');
        fireEvent.changeText(metalPicker, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}
        );
    }
    );
    

    
});