import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TransportationRadioButton from '../../navigation/screens/Progress/TransportationRadioButton';
describe('TransportationRadioButton', () => {
  const setSelectedValue = jest.fn();
  const selectedValue = 'Car';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all radio buttons', () => {
    const { getByText } = render(<TransportationRadioButton setSelectedValue={setSelectedValue} selectedValue={selectedValue} />);
    expect(getByText('Car')).toBeDefined();
    expect(getByText('Electric Car')).toBeDefined();
    expect(getByText('Bike')).toBeDefined();
    expect(getByText('Bus')).toBeDefined();
    expect(getByText('Train')).toBeDefined();
    expect(getByText('Plane')).toBeDefined();
  });

  it('should call setSelectedValue when a radio button is pressed', () => {
    const { getByTestId } = render(<TransportationRadioButton setSelectedValue={setSelectedValue} selectedValue={selectedValue} />);
    fireEvent.press(getByTestId('Car'));
    expect(setSelectedValue).toHaveBeenCalledWith('Car');
  });

  
});