import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForgotPasswordNavButton from '../../components/ForgotPasswordNavButton';

describe('ForgotPasswordNavButton', () => {
    it('calls the onPress function when pressed', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(<ForgotPasswordNavButton onPress={onPressMock} />);
      const forgotPasswordNavButton = getByText('Forgot Password?');
  
      fireEvent.press(forgotPasswordNavButton);
  
      expect(onPressMock).toHaveBeenCalled();
    });
});
  
