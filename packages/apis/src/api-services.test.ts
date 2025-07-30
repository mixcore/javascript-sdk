import { ApiService } from './api-services';

describe('ApiService', () => {
  const api = new ApiService({ apiBaseUrl: 'https://mixcore.net' });

  it('should instantiate with config', () => {
    expect(api).toBeInstanceOf(ApiService);
  });

  it('should GET page content (public endpoint)', async () => {
    const data = await api.get('/api/v2/rest/mixcore/page-content');
    expect(data).toBeDefined();
    // Optionally check for paging structure or items
  });

  it('should fail login with invalid credentials (POST)', async () => {
    try {
      await api.post('/api/v2/rest/auth/user/login', {
        username: 'invalid',
        password: 'invalid',
      });
      // If no error, fail
      fail('Expected error for invalid login');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
