import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '../../navigation/screens/Login-SignUp/LoginScreen';

describe('LoginScreen', () => {
  it('renders all required components', () => {
    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId('logo')).toBeDefined();
    expect(getByTestId('emailInput')).toBeDefined();
    expect(getByTestId('passwordInput')).toBeDefined();
    expect(getByTestId('loginButton')).toBeDefined();
    expect(getByTestId('signUpNavButton')).toBeDefined();
  });
});
