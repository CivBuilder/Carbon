import getRecentEmissions from '../../util/getRecentEmissions';
import { API_URL } from '../../config/Api';
import { getAuthHeader } from '../../util/UserManagement';

describe('getRecentEmissions', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('should fetch recent emissions and return data', async () => {
    const mockData = { test: 'data' };
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue(mockData),
    };
    window.fetch.mockResolvedValue(mockResponse);

    const result = await getRecentEmissions();

    expect(window.fetch).toHaveBeenCalledWith(`${API_URL}userEmissions/recentRecords`, await getAuthHeader());
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  }, 10000);

  it('should handle a 204 response and return null', async () => {
    const mockResponse = {
      status: 204,
    };
    window.fetch.mockResolvedValue(mockResponse);

    const result = await getRecentEmissions();

    expect(window.fetch).toHaveBeenCalledWith(`${API_URL}userEmissions/recentRecords`, await getAuthHeader());
    expect(result).toBeNull();
  }, 10000);

  it('should handle a network timeout and throw an error', async () => {
    jest.useFakeTimers();
    const mockResponse = new Promise(() => {});
    window.fetch.mockResolvedValue(mockResponse);

    const promise = getRecentEmissions();

    jest.advanceTimersByTime(25001);
    await expect(promise).rejects.toThrowError('Network request timed out');
  }, 10000);

  it('should handle an error and throw an error', async () => {
    const mockError = new Error('Test error');
    window.fetch.mockRejectedValue(mockError);

    await expect(getRecentEmissions()).rejects.toThrowError(mockError);
  }, 10000);
});
