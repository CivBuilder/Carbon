import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Category from '../../../../navigation/screens/Progress/Category';

jest.mock('../../../../hooks/useToggle', () => ({
  useToggle: jest.fn(() => ({ status: true, toggleStatus: jest.fn() })),
}));

jest.mock('../../../../util/EmissionRecords', () => ({
  getRecentEmissions: jest.fn(() => Promise.resolve([
    { date: '2022-01-01', transport_emissions: 10, home_emissions: 20, diet_emissions: 30 },
    { date: '2022-01-02', transport_emissions: 20, home_emissions: 30, diet_emissions: 40 },
  ])),
}));

describe('Category component', () => {
  it('should render correctly', async () => {
    const props = {
      id: 0,
      title: 'Transportation',
      emission: 100,
      percentage: 50,
    };
    const { getByText, getByTestId } = render(<Category {...props} />);
    expect(getByText('Transportation')).toBeDefined();
    expect(getByText('100')).toBeDefined();
    expect(getByText('50%')).toBeDefined();
    expect(getByTestId('expand-button')).toBeDefined();
    await expect(getByText('01/01/2022')).toBeDefined();
    await expect(getByText('01/02/2022')).toBeDefined();
  });

  it('should toggle expand on button press', () => {
    const props = {
      id: 0,
      title: 'Transportation',
      emission: 100,
      percentage: 50,
    };
    const { getByTestId } = render(<Category {...props} />);
    const button = getByTestId('expand-button');
    fireEvent.press(button);
    expect(button).toHaveStyle({ height: 70 });
    fireEvent.press(button);
    expect(button).toHaveStyle({ height: 30 });
  });
});
