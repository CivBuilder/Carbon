import React from 'react';
import { render } from '@testing-library/react-native';
import SignUpScreen from '../../navigation/screens/Login-SignUp/SignUpScreen';

describe('SignUpScreen', () => {
  it('renders all required components', () => {
    const { getByTestId } = render(<SignUpScreen />);
    expect(getByTestId('image')).toBeDefined();
    expect(getByTestId('emailInput')).toBeDefined();
    expect(getByTestId('passwordInput')).toBeDefined();
    expect(getByTestId('confirmPasswordInput')).toBeDefined();
    expect(getByTestId('signUpButton')).toBeDefined();
    expect(getByTestId('loginNavButton')).toBeDefined();
  });
});
