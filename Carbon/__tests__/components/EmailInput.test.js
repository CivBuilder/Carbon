import React from 'react';
import { render } from '@testing-library/react-native';
import EmailInput from '../../components/EmailInput';

describe('EmailInput', () => {
  it('renders a TextInput with a placeholder', () => {
    const { getByPlaceholderText } = render(<EmailInput />);
    const emailInput = getByPlaceholderText('Email');

    expect(emailInput).toBeDefined();
  });
});
