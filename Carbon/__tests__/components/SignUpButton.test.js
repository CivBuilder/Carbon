import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUpButton from '../../components/SignUpButton'

describe('SignUpButton', () => {
    it('calls the onPress function when pressed', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(<SignUpButton onPress={onPressMock} />);
      const signUpButton = getByText('Sign Up');
    
      fireEvent.press(signUpButton);
    
      expect(onPressMock).toHaveBeenCalled();
    });
  });
  