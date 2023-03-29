import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUpNavButton from '../../components/SignUpNavButton';

describe('SignUpNavButton', () => {
  it('fires a onPress event when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<SignUpNavButton onPress={onPressMock} />);
    const signUpNavButton = getByText('Sign Up');

    fireEvent.press(signUpNavButton);
    expect(onPressMock).toHaveBeenCalled();
  });
});
