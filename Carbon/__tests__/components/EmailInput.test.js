import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmailInput from '../../components/EmailInput';

describe('EmailInput', () => {
  it('updates the text value when the user types in the input', () => {
    const { getByTestId } = render(<EmailInput testID="emailInput" />);
    const input = getByTestId('emailInput');
    fireEvent.changeText(input, 'testuser@example.com');
    expect(input.props.value).toBe('testuser@example.com');
  });
});
