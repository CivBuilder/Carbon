import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import LoginScreen from '../../navigation/screens/Login-SignUp/LoginScreen';
import { login } from '../../util/UserManagement';
import { ScreenNames } from '../../navigation/screens/Main/ScreenNames';
jest.mock('../../util/UserManagement');

describe('LoginScreen', () => {
  it('renders all required components', () => {
    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId('logo')).toBeDefined();
    expect(getByTestId('emailInput')).toBeDefined();
    expect(getByTestId('passwordInput')).toBeDefined();
    expect(getByTestId('loginButton')).toBeDefined();
    expect(getByTestId('signUpNavButton')).toBeDefined();
  });

  it('should update the username when the email input is changed', async () => {
    const { getByTestId } = render(<LoginScreen />);
    const emailInput = getByTestId('emailInput');

    await act(async () => {
      await fireEvent.changeText(emailInput, 'testuser');
    });

    expect(emailInput.props.value).toBe('testuser');
  });

  it('should update the password when the password input is changed', async () => {
    const { getByTestId } = render(<LoginScreen />);
    const passwordInput = getByTestId('passwordInput');

    await act(async () => {
      await fireEvent.changeText(passwordInput, 'testpassword');
    });

    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('should call the handleLogin function when the login button is pressed', async () => {
    const mockHandleLogin = jest.fn();
    const { getByTestId } = render(<LoginScreen handleLogin={mockHandleLogin} />);
    const loginButton = getByTestId('loginButton');

    await act(async () => {
      fireEvent.press(loginButton);
    });

    expect(login).toHaveBeenCalledTimes(1);
  });

  it('should should navigate to signup screen when the sign up button is pressed', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(<LoginScreen navigation={navigation}/>);

    const signUpNavButton = getByTestId('signUpNavButton');
    fireEvent.press(signUpNavButton);

    expect(navigation.navigate).toHaveBeenCalledWith(ScreenNames.SIGNUP);
  });
});