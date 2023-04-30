import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecordFood from '../../navigation/screens/Progress/RecordFood';
import { ScreenNames } from '../../navigation/screens/Main/ScreenNames';
describe('RecordFood', () => {
    let navigation, route, component;
    beforeEach(() => {
      navigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
    };
    route = {
      params: {
          transport_emissions: 1,
          total_emissions: 5,
          lifestyle_emissions: 1,
          diet_emissions: 90,
          home_emissions: 1,
      },
    };
  
    });
    it('should render correctly', () => {
        const { getByText } = render(<RecordFood />);
        expect(getByText('Log your food intake for today')).toBeTruthy();
    }); 
    
    it('should navigate to RecordEmission with params', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        const de = {"diet_emissions": 90}
        //set picker values
        const beefPicker = getByTestId('red-meat-picker');
        fireEvent(beefPicker, 'onValueChange', '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : de}
        );
    });
 
});