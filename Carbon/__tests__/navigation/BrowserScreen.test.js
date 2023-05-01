

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { WebView } from 'react-native-webview';
import { BrowserScreen } from '../../navigation/screens/index.js';

jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

describe('BrowserScreen', () => {
  const mockRoute = { params: { id: 123 } };
  const mockNavigation = { goBack: jest.fn() };
  const mockApiResponse = {
    article: {
      articlelink: 'https://example.com/article/123',
    },
  };

  it('displays the article when loaded', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiResponse),
      })
    );
    const { getByTestId } = render(
      <BrowserScreen navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
    expect(global.fetch.mock.calls[0][0]).toBe(
      'http://Carbonserver-env.eba-pmpdtmpe.us-east-1.elasticbeanstalk.com/api/article/123'
    );
    expect(getByTestId('webview')).toBeTruthy();
  });

  it('navigates back if API call fails', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API Error'));
    render(<BrowserScreen navigation={mockNavigation} route={mockRoute} />);

    await waitFor(() => expect(mockNavigation.goBack).toBeCalledTimes(1));
  });
});