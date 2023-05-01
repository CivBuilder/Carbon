import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalculationsButton from '../../components/CalculationsButton';

describe('CalculationsButton', () => {
  test('should render button text', () => {
    const { getByText } = render(<CalculationsButton onPress={() => {}} />);
    const buttonText = getByText('Calculation Details');
    expect(buttonText).toBeDefined();
  });

  test('should execute onPress function when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<CalculationsButton onPress={onPressMock} />);
    const button = getByTestId('calculation-details');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });


});