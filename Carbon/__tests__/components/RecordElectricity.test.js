import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecordElectricity from '../../navigation/screens/Progress/RecordElectricity';
import { ScreenNames } from '../../navigation/screens/Main/ScreenNames';
describe('RecordElectricity', () => {
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
        const { getByText } = render(<RecordElectricity navigation={navigation} route={route} />);
        expect(getByText('Log your home electricity usage for today')).toBeTruthy();
    }); 

    it('should navigate to RecordEmission with params', () => {
        const { getByTestId } = render(<RecordElectricity navigation={navigation} route={route} />);
        const he = {"home_emissions": 18}
        //set picker values
        const electricityInput = getByTestId('electricity-input');
        fireEvent.changeText(electricityInput, '20');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : he}
        );
    });
});