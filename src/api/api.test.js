import api from '../api/api';
import axios from 'axios';

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
});

describe('API instance', () => {
  it('should have the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe('https://localhost:7101/api');
  });

  it('should attach Authorization header if token exists', async () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    // Mock a config object for interceptor
    const config = { headers: {} };
    const newConfig = await api.interceptors.request.handlers[0].fulfilled(config);

    expect(newConfig.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header if no token', async () => {
    const config = { headers: {} };
    const newConfig = await api.interceptors.request.handlers[0].fulfilled(config);

    expect(newConfig.headers.Authorization).toBeUndefined();
  });
});
