import { ApiService } from '../src/api-services';

describe('ApiService', () => {
  const config = {
    apiBaseUrl: 'https://mixcore.net',
    apiKey: process.env.MIXCORE_API_KEY || '',
  };
  const service = new ApiService(config);

  it('should instantiate with config', () => {
    expect(service).toBeInstanceOf(ApiService);
  });

  it('should GET page content (public endpoint)', async () => {
    const data = await service.get('/api/v2/rest/mixcore/page-content');
    expect(data).toBeDefined();
    // Optionally check for paging structure or items
  });

  it('should fail login with invalid credentials (POST)', async () => {
    jest.setTimeout(10000); // Increase timeout to 10 seconds
    try {
      await service.post('/api/v2/rest/auth/user/login', {
        username: 'invalid',
        password: 'invalid',
      });
      // If no error, fail
      fail('Expected error for invalid login');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should GET a valid endpoint', async () => {
    const data = await service.get('/api/v2/rest/mixcore/module-data/get-module-data', { moduleId: '1' });
    expect(data).toBeDefined();
  });

  // Note: POST and DELETE require valid credentials and real data
});
