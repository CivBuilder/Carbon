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
       
    it('should alert if no type of transport is selected', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const milesPicker = getByTestId('miles-traveled');
        jest.spyOn(Alert, 'alert');
        fireEvent(milesPicker, 'onValueChange', '10');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith("Please select a value for both fields");
    });
    //each radio button should work
    it('should navigate to RecordEmission with correct params for car', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const tm = {"transport_emissions": 8}
        const radioButton = getByTestId('Car');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent(milesPicker, 'onValueChange', '10');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : tm}
        );
    });
    it('should navigate to RecordEmission with correct params for Bus', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const tm = {"transport_emissions": 7}
        const radioButton = getByTestId('Bus');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent(milesPicker, 'onValueChange', '10');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : tm}
        );
    });
    it('should navigate to RecordEmission with correct params for Train', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const tm = {"transport_emissions": 4}
        const radioButton = getByTestId('Train');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent(milesPicker, 'onValueChange', '10');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : tm}
        );
    }
    );
    it('should navigate to RecordEmission with correct params for Plane', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const tm = {"transport_emissions": 530}
        const radioButton = getByTestId('Plane');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent(milesPicker, 'onValueChange', '10');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : tm}
        );
    }
    );
    //bike
    it('should navigate to RecordEmission with correct params for Bike', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const tm = {"transport_emissions": 1}
        const radioButton = getByTestId('Bike');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent(milesPicker, 'onValueChange', '10');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : tm}
        );
    }
    );
    //eleccar
    it('should navigate to RecordEmission with correct params for Electric Car', () => {
        const { getByTestId } = render(<RecordTransportation navigation={navigation} route={route} />);
        const tm = {"transport_emissions": 8}
        const radioButton = getByTestId('ElecCar');
        fireEvent(radioButton, 'press');
        const milesPicker = getByTestId('miles-traveled');
        fireEvent(milesPicker, 'onValueChange', '10');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : tm}
        );
    }
    );
});