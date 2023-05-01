import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UsernameInput from '../../components/UsernameInput';

describe('UsernameInput', () => {
    it('updates text when user types', () => {
      const { getByTestId } = render(<UsernameInput testID="usernameInput" />);
      const input = getByTestId('usernameInput');
  
      fireEvent.changeText(input, 'testuser');
  
      expect(input.props.value).toBe('testuser');
    });
  });