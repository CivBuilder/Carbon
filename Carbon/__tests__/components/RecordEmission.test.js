import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import RecordEmission from '../../navigation/screens/Progress/RecordEmission';

describe('RecordEmissionScreen', () => {
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
    component = render(<RecordEmission navigation={navigation} route={route} />);
  
  });
  
  it('should render correctly', () => {
    const { getByTestId } = component;
    expect(getByTestId('modal-view')).toBeTruthy();
  });
  it('should navigate to the FoodScreen when the cutlery icon is pressed', async () => {
    const { getByTestId } = component;
    const cutleryIcon = getByTestId('cutlery-icon');
    fireEvent.press(cutleryIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('Food', {sentEmissionsEntry : route.params});
  });
  it('should navigate to the TransportationScreen when the car icon is pressed', async () => {
    const { getByTestId } = component;
    const carIcon = getByTestId('car-icon');
    fireEvent.press(carIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('Transportation', {sentEmissionsEntry : route.params});
  });
  it('should navigate to the RecyclingScreen when the recycle icon is pressed', async () => {
    const { getByTestId } = component;
    const recycleIcon = getByTestId('recycle-icon');
    fireEvent.press(recycleIcon);
    expect(navigation.navigate).toHaveBeenCalledWith('Recycling', {sentEmissionsEntry : route.params});
  }
  );
  
});