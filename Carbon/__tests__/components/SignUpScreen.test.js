import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUpScreen from '../../navigation/screens/Login-SignUp/SignUpScreen';
import { ScreenNames } from '../../navigation/screens/Main/ScreenNames';

describe('SignUpScreen', () => {
  it('should update state when input fields are changed', () => {
    const { getByTestId } = render(<SignUpScreen />);
    const usernameInput = getByTestId('usernameInput');
    const emailInput = getByTestId('emailInput');
    const passwordInput = getByTestId('passwordInput');
    const confirmPasswordInput = getByTestId('confirmPasswordInput');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(usernameInput.props.value).toBe('testuser');
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(confirmPasswordInput.props.value).toBe('password123');
  });

  // it('should call handleSignUp when SignUpButton is pressed', () => {
  //   const mockHandleSignUp = jest.fn();
  //   const { getByTestId } = render(<SignUpScreen handleSignUp={mockHandleSignUp} />);
  //   const signUpButton = getByTestId('signUpButton');
    
  //   fireEvent.press(signUpButton);

  //   expect(handleSignUp).toHaveBeenCalledTimes(1);
  // });

  it('should navigate to LoginScreen when LoginNavButton is pressed', () => {
    const navigation = { navigate: jest.fn() };
    const { getByTestId } = render(<SignUpScreen navigation={navigation} />);
    const loginNavButton = getByTestId('loginNavButton');

    fireEvent.press(loginNavButton);

    expect(navigation.navigate).toHaveBeenCalledWith(ScreenNames.LOGIN);
  });
});