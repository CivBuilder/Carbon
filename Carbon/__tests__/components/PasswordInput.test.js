import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PasswordInput from '../../components/PasswordInput';

describe('PasswordInput', () => {
  const mockOnChangeText = jest.fn();

  it('should toggle the password visibility when the icon is pressed', () => {
    const { getByTestId } = render(<PasswordInput text="Password" testID="passwordInput" onChangeText={mockOnChangeText} />);
    const input = getByTestId('passwordInput');
    const icon = getByTestId('passwordVisibilityIcon');

    // Password should be hidden by default
    expect(input.props.secureTextEntry).toBe(true);

    // Click the icon to toggle password visibility
    fireEvent.press(icon);
    expect(input.props.secureTextEntry).toBe(false);

    // Click the icon again to toggle password visibility
    fireEvent.press(icon);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should call the onChangeText function with the updated password value', () => {
    const { getByTestId } = render(<PasswordInput text="Password" testID="passwordInput" onChangeText={mockOnChangeText} />);
    const input = getByTestId('passwordInput');
    
    // Change the input value
    fireEvent.changeText(input, 'myPassword');

    // onChangeText should be called with the updated value
    expect(mockOnChangeText).toHaveBeenCalledWith('myPassword');
  });
});