import { AuthService, AuthServiceConfig } from '../src/auth-services';

describe('AuthService', () => {
  const config: AuthServiceConfig = {
    apiBaseUrl: 'https://mixcore.net',
    encryptAES: (data) => data, // mock encryption
    updateAuthData: jest.fn(),
    fillAuthData: jest.fn(async () => ({
      info: {
        userRoles: [{
          id: '1',
          description: 'Admin',
          isActived: true
        }],
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      }
    })),
    initAllSettings: jest.fn(async () => {}),
    getApiResult: jest.fn(async (req) => ({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    })),
    getRestApiResult: jest.fn(async (req) => ({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    })),
    localStorage: { removeItem: jest.fn() } as any,
  };
  const service = new AuthService(config);

  // Existing auth tests
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

  it('should call loginUnsecure with correct payload', async () => {
    await service.loginUnsecure({
      email: 'test@example.com',
      userName: 'user',
      phoneNumber: '123456789',
      password: 'pass',
      rememberMe: true,
      returnUrl: '/home'
    });
    expect(config.getRestApiResult).toHaveBeenCalledWith({
      method: 'POST',
      url: '/api/v2/rest/auth/user/login-unsecure',
      data: JSON.stringify({
        email: 'test@example.com',
        userName: 'user',
        phoneNumber: '123456789',
        password: 'pass',
        rememberMe: true,
        returnUrl: '/home'
      })
    }, true);
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

  // Role management tests
  it('should get role list', async () => {
    const result = await service.getRoles();
    expect(result).toEqual({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    });
  });

  it('should create role', async () => {
    const result = await service.createRole({ description: 'New Role' });
    expect(result).toEqual({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    });
  });

  it('should update role', async () => {
    const result = await service.updateRole('1', { description: 'Updated Role' });
    expect(result).toEqual({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    });
  });

  it('should delete role', async () => {
    const result = await service.deleteRole('1');
    expect(result).toEqual({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    });
  });

  it('should get default role', async () => {
    const result = await service.getDefaultRole();
    expect(result).toEqual({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    });
  });
});
