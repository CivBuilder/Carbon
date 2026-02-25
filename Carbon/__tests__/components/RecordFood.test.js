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
          diet_emissions: 120,
          home_emissions: 1,
      },
    };

    });
    it('should render correctly', () => {
        const { getByText } = render(<RecordFood />);
        expect(getByText('Log your food intake for today')).toBeTruthy();
    });

    it('should navigate to RecordEmission with params for red meat', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        const de = {"diet_emissions": 120}
        //set picker values
        const redMeatInput = getByTestId('red-meat-input');
        fireEvent.changeText(redMeatInput, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION,
            {returningEmissionsEntry : de}
        );
    });
    it('should navigate to RecordEmission with params for poultry', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        const de = {"diet_emissions": 12}
        //set picker values
        const poultryInput = getByTestId('poultry-input');
        fireEvent.changeText(poultryInput, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION,
            {returningEmissionsEntry : de}
        );
    }
    );
    it('should navigate to RecordEmission with params for cheese', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        const de = {"diet_emissions": 22}
        //set picker values
        const cheeseInput = getByTestId('cheese-input');
        fireEvent.changeText(cheeseInput, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION,
            {returningEmissionsEntry : de}
        );
    }
    );
    it('should navigate to RecordEmission with params for pork', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        const de = {"diet_emissions": 15}
        //set picker values
        const porkInput = getByTestId('pork-input');
        fireEvent.changeText(porkInput, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION,
            {returningEmissionsEntry : de}
        );
    }
    );

    it('should render plant-based food inputs', () => {
        const { getByTestId } = render(<RecordFood />);
        expect(getByTestId('rice-input')).toBeTruthy();
        expect(getByTestId('tofu-input')).toBeTruthy();
        expect(getByTestId('beans-input')).toBeTruthy();
        expect(getByTestId('lentils-input')).toBeTruthy();
        expect(getByTestId('vegetables-input')).toBeTruthy();
        expect(getByTestId('fruit-input')).toBeTruthy();
        expect(getByTestId('nuts-input')).toBeTruthy();
        expect(getByTestId('bread-input')).toBeTruthy();
        expect(getByTestId('potatoes-input')).toBeTruthy();
        expect(getByTestId('pasta-input')).toBeTruthy();
    });

    it('should navigate to RecordEmission with params for rice', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        const de = {"diet_emissions": 8}
        const riceInput = getByTestId('rice-input');
        fireEvent.changeText(riceInput, '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION,
            {returningEmissionsEntry : de}
        );
    });

});