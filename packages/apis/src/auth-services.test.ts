import { AuthService, AuthServiceConfig } from './auth-services';

describe('AuthService', () => {
  const config: AuthServiceConfig = {
    apiBaseUrl: 'https://mixcore.net',
    encryptAES: (data) => data, // mock encryption
    updateAuthData: jest.fn(),
    fillAuthData: jest.fn(async () => ({ info: { userRoles: [{ description: 'Admin', isActived: true }] } })),
    initAllSettings: jest.fn(async () => {}),
    getApiResult: jest.fn(async (req) => ({ isSucceed: true, data: {} })),
    getRestApiResult: jest.fn(async (req) => ({ isSucceed: true, data: {} })),
    localStorage: { removeItem: jest.fn() } as any,
  };
  const service = new AuthService(config);

  it('should call saveRegistration', async () => {
    await service.saveRegistration({});
    expect(config.getApiResult).toHaveBeenCalled();
  });

  it('should call forgotPassword', async () => {
    await service.forgotPassword({});
    expect(config.getRestApiResult).toHaveBeenCalled();
  });

  it('should call login and updateAuthData', async () => {
    await service.login({ username: 'user', password: 'pass' });
    expect(config.updateAuthData).toHaveBeenCalled();
  });

  it('should call logOut and removeItem', async () => {
    await service.logOut();
    expect(config.localStorage?.removeItem).toHaveBeenCalledWith('authorizationData');
  });

  it('should call isInRole', async () => {
    await service.fillAuthData();
    expect(service.isInRole('Admin')).toBe(true);
  });
});
