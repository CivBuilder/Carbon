import React from 'react';
import { render } from '@testing-library/react-native';
import PasswordInput from '../../components/PasswordInput';

describe('PasswordInput', () => {
  it('renders the input field with a placeholder text', () => {
    const { getByPlaceholderText } = render(<PasswordInput text="Password" />);
    const passwordInput = getByPlaceholderText('Password');

    expect(passwordInput).toBeDefined();
  });

  it('renders the input field with secureTextEntry', () => {
    const { getByPlaceholderText } = render(<PasswordInput text="Password" />);
    const passwordInput = getByPlaceholderText('Password');

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});
