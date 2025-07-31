import { ApiService } from '@mixcore/api';
import { UserServices } from '../src/user-services';

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
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'me' }) });
    const result = await userServices.getMyProfile();
    expect(result).toEqual({ id: 'me' });
  });

  it('should call saveUser', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const result = await userServices.saveUser({ id: '1', name: 'Test' });
    expect(result).toEqual({ success: true });
  });

  it('should call register', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'new' }) });
    const result = await userServices.register({ name: 'New User' });
    expect(result).toEqual({ id: 'new' });
  });

  it('should call getUser', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ id: '123' }) });
    const result = await userServices.getUser('123', 'basic');
    expect(result).toEqual({ id: '123' });
  });

  it('should call getUsers', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ users: [] }) });
    const result = await userServices.getUsers({ page: 1 });
    expect(result).toEqual({ users: [] });
  });

  it('should call importUsers', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ imported: 5 }) });
    const result = await userServices.importUsers('base64data');
    expect(result).toEqual({ imported: 5 });
  });

  it('should call removeUser', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const result = await userServices.removeUser('123');
    expect(result).toEqual({ success: true });
  });

  it('should call updateRoleStatus', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ updated: true }) });
    const result = await userServices.updateRoleStatus({ userId: '1', roleId: 'admin' });
    expect(result).toEqual({ updated: true });
  });

  it('should call getUserDemographicInfo', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ info: {} }) });
    const result = await userServices.getUserDemographicInfo();
    expect(result).toEqual({ info: {} });
  });
});
