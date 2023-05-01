import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import { ScreenDimensionsProvider, useScreenDimensions } from '../../hooks/ScreenDimensionsProvider';

describe('ScreenDimensionsProvider', () => {
  test('renders children with screen dimensions context', () => {
    const expectedDimensions = { width: 320, height: 480 };
    Dimensions.get.mockReturnValueOnce(expectedDimensions);

    const { getByText } = render(
      <ScreenDimensionsProvider>
        <Text>Test</Text>
      </ScreenDimensionsProvider>
    );

    expect(Dimensions.get).toHaveBeenCalledWith('window');
    expect(getByText('Test')).toBeDefined();
  });

  test('updates screen dimensions on change event', () => {
    const expectedDimensions = { width: 640, height: 960 };
    Dimensions.get.mockReturnValueOnce(expectedDimensions);

    const { getByText } = render(
      <ScreenDimensionsProvider>
        <Text>Test</Text>
      </ScreenDimensionsProvider>
    );

    expect(Dimensions.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    const handleDimensionsChange = Dimensions.addEventListener.mock.calls[0][1];
    act(() => {
      handleDimensionsChange({ window: expectedDimensions });
    });

    expect(getByText('Test')).toBeDefined();
  });

  test('removes change event listener on unmount', () => {
    const expectedDimensions = { width: 320, height: 480 };
    Dimensions.get.mockReturnValueOnce(expectedDimensions);
    const removeEventListenerMock = jest.spyOn(Dimensions, 'removeEventListener');

    const { unmount } = render(
      <ScreenDimensionsProvider>
        <Text>Test</Text>
      </ScreenDimensionsProvider>
    );

    expect(removeEventListenerMock).not.toHaveBeenCalled();

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });
});

describe('useScreenDimensions', () => {
  test('returns screen dimensions from context', () => {
    const expectedDimensions = { width: 320, height: 480 };
    Dimensions.get.mockReturnValueOnce(expectedDimensions);

    const TestComponent = () => {
      const screenDimensions = useScreenDimensions();
      return (
        <Text>{JSON.stringify(screenDimensions)}</Text>
      );
    };

    const { getByText } = render(
      <ScreenDimensionsProvider>
        <TestComponent />
      </ScreenDimensionsProvider>
    );

    expect(getByText(JSON.stringify(expectedDimensions))).toBeDefined();
  });
});
