import { ApiService } from './src/api-services';
import { UserServices } from './src/user-services';

describe('UserServices', () => {
  let api: ApiService;
  let userServices: UserServices;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    userServices = new UserServices(api);
  });

  it('should instantiate', () => {
    expect(userServices).toBeInstanceOf(UserServices);
  });

  it('should call getMyProfile', async () => {
    // Mock fetch
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'me' }) });
    const result = await userServices.getMyProfile();
    expect(result).toEqual({ id: 'me' });
  });

  it('should call saveUser', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const result = await userServices.saveUser({ id: '1', name: 'Test' });
    expect(result).toEqual({ success: true });
  });

  // Add more tests for other methods as needed
});
