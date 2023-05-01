import React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import CalculationScreen from '../../navigation/screens/Settings/CalculationScreen';
describe('CalculationScreen', () => {
    test('renders subheadings', () => {
        const { getByText } = render(<CalculationScreen />);
        expect(getByText('Transport')).toBeTruthy();

    });
    test('renders texts', () => {
        const { getByText } = render(<CalculationScreen />);
        expect(getByText('What the values mean')).toBeTruthy();

      });
    test('opens bike calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const bikeCalculationsLink = getByTestId('bike-link');
        fireEvent.press(bikeCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    });
    test('opens car calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const carCalculationsLink = getByTestId('car-link');
        fireEvent.press(carCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references');
    });
    test('opens electric car calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const electricCarCalculationsLink = getByTestId('electric-car-link');
        fireEvent.press(electricCarCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://climate.mit.edu/ask-mit/are-electric-vehicles-definitely-better-climate-gas-powered-cars#:~:text=The%20researchers%20found%20that%2C%20on,vehicle%20created%20just%20200%20grams');
    });
    test('opens plane calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const planeCalculationsLink = getByTestId('plane-link');
        fireEvent.press(planeCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens bus calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const busCalculationsLink = getByTestId('bus-link');
        fireEvent.press(busCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://blueskymodel.org/air-mile');
    }
    );
    test('opens train calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const trainCalculationsLink = getByTestId('train-link');
        fireEvent.press(trainCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://blueskymodel.org/air-mile');
    }
    );
    test('opens home electricity calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const homeElectricityCalculationsLink = getByTestId('home-electricity-link');
        fireEvent.press(homeElectricityCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references');
    }
    );
    test('opens beef calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const beefCalculationsLink = getByTestId('beef-link');
        fireEvent.press(beefCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens pork calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const porkCalculationsLink = getByTestId('pork-link');
        fireEvent.press(porkCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens cheese calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const cheeseCalculationsLink = getByTestId('cheese-link');
        fireEvent.press(cheeseCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens poultry calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const poultryCalculationsLink = getByTestId('poultry-link');
        fireEvent.press(poultryCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens glass calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const glassCalculationsLink = getByTestId('glass-link');
        fireEvent.press(glassCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens plastic calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const plasticCalculationsLink = getByTestId('plastic-link');
        fireEvent.press(plasticCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens metal calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const metalCalculationsLink = getByTestId('metal-link');
        fireEvent.press(metalCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );
    test('opens paper calculations link', () => {
        const { getByTestId } = render(<CalculationScreen />);
        const paperCalculationsLink = getByTestId('paper-link');
        fireEvent.press(paperCalculationsLink);
        expect(Linking.openURL).toHaveBeenCalledWith('https://www.sciencedirect.com/science/article/pii/S0959378021000030');
    }
    );       
});