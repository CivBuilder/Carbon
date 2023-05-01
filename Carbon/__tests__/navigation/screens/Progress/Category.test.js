import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Category from '../../../../navigation/screens/Progress/Category';
import { getRecentEmissions } from '../../../../util/getRecentEmissions';
import { useToggle } from '../../../../hooks/useToggle';

// Mock the useToggle hook
jest.mock('../../../../hooks/useToggle');

jest.mock('../../../../hooks/useToggle', () => ({
  useToggle: jest.fn(() => ({ status: true, toggleStatus: jest.fn() })),
}));

jest.mock('../../../../util/getRecentEmissions', () => ({
  getRecentEmissions: jest.fn(() => []),
}));

describe('Category component', () => {
  // Mock the recent emissions data
  const mockRecords = [
    {
      Transport: 10,
      Home: 20,
      Diet: 30,
      date: '01/01/2022',
    },
    {
      Transport: 5,
      Home: 15,
      Diet: 25,
      date: '02/01/2022',
    },
  ];

  beforeAll(() => {
    // Mock the getRecentEmissions function
    getRecentEmissions.mockResolvedValue(mockRecords);

    // Mock the useToggle hook
    useToggle.mockReturnValue({
      status: false,
      toggleStatus: jest.fn(),
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders CategoryHeader and CategoryContent components', async () => {
    // Arrange
    const props = {
      id: 1,
      title: 'Transport',
      emission: 10,
      percentage: 50,
    };

    // Act
    const { getByText, queryByText } = render(<Category {...props} />);
    await act(async () => {
      // Wait for useEffect to finish
    });

    // Assert
    expect(getByText('Transport')).not.toBeNull();
    expect(getByText('10')).not.toBeNull();
    expect(getByText('50')).not.toBeNull();
    expect(queryByText('01/01/2022')).toBeNull();
  });

  it('expands and collapses the CategoryContent component on press', async () => {
    // Arrange
    const props = {
      id: 2,
      title: 'Home',
      emission: 20,
      percentage: 25,
    };

    // Act
    const { getByTestId, getByText, queryByText } = render(<Category {...props} />);
    await act(async () => {
      // Wait for useEffect to finish
    });
    const expandButton = getByTestId('expand-button');
    fireEvent.press(expandButton);

    // Assert
    expect(getByText('Home')).not.toBeNull();
    expect(getByText('20')).not.toBeNull();
    expect(getByText('25')).not.toBeNull();
    expect(getByText('01/01/2022')).not.toBeNull();

    fireEvent.press(expandButton);

    expect(queryByText('01/01/2022')).toBeNull();
  });
});
