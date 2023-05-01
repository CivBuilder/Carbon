import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GetStartedButton from '../../components/GetStartedButton';

describe('GetStartedButton', () => {
  it('calls onPress prop when button is pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<GetStartedButton onPress={onPress} />);

    fireEvent.press(getByTestId('getStartedButton'));

    expect(onPress).toHaveBeenCalled();
  });
});