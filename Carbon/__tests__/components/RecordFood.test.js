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
    
    it('should navigate to RecordEmission with params for red meat', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        const de = {"diet_emissions": 90}
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
        const de = {"diet_emissions": 17}
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
        const de = {"diet_emissions": 33}
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
        const de = {"diet_emissions": 23}
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
    //it should not allow values > 10
    it('should not allow values > 10', () => {
        const { getByTestId } = render(<RecordFood navigation={navigation} route={route} />);
        //set picker values
        const redMeatInput = getByTestId('red-meat-input');
        fireEvent.changeText(redMeatInput, '11');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).not.toHaveBeenCalled();
    }
    );
});