import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecordTransportation from '../../navigation/screens/Progress/RecordTransportation';
import { ScreenNames } from '../../navigation/screens/Main/ScreenNames';
import { Alert } from 'react-native';

describe('RecordTransportation', () => {
    let navigation, route; 
    beforeEach(() => {
      navigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
    };
    route = {
      params: {
          transport_emissions: 1,
          total_emissions: 1,
          lifestyle_emissions: 1,
          diet_emissions: 1,
          home_emissions: 1,
      },
    };
    });
    it('should render correctly', () => {
        const { getByText } = render(<RecordTransportation />);
        expect(getByText('What was your mode of transportation?')).toBeTruthy();
    }); 
    it('should navigate to RecordEmission with params for car', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const lm = {"transport_emissions": 1}
        const radioButton = getByTestId('Car');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent.changeText(milesPicker, '1');
        
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}  
        );  
    });
    it('should navigate to RecordEmission with params for electric car', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const lm = {"transport_emissions": 1}
        const radioButton = getByTestId('ElecCar');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent.changeText(milesPicker, '1');
        
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}  
        );  
    });
    it('should navigate to RecordEmission with params for bike', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const lm = {"transport_emissions": 0}
        const radioButton = getByTestId('Bike');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent.changeText(milesPicker, '1');
        
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}  
        );  
    }
    );
    it('should navigate to RecordEmission with params for bus', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const lm = {"transport_emissions": 1}
        const radioButton = getByTestId('Bus');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent.changeText(milesPicker, '1');
        
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}  
        );  
    }
    );
    it('should navigate to RecordEmission with params for train', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const lm = {"transport_emissions": 4}
        const radioButton = getByTestId('Train');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent.changeText(milesPicker, '10');
        
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}  
        );  
    }
    );
    it('should navigate to RecordEmission with params for plane', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const lm = {"transport_emissions": 53}
        const radioButton = getByTestId('Plane');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent.changeText(milesPicker, '1');
        
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}  
        );  
    }
    );
        
});
