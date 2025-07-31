import { AuthService, AuthServiceConfig } from '../src/auth-services';
import type { ApiService, ApiResult, RestApiResult } from '@mixcore/api';
import { ApiService } from '@mixcore/api';

describe('AuthService', () => {
  const mockApiService: jest.Mocked<ApiService> = {
    get: jest.fn(async (endpoint: string, params?: Record<string, any>) => ({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    })),
    post: jest.fn(async (endpoint: string, data: any, options?: { isFormData?: boolean }) => ({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    })),
    delete: jest.fn(async (endpoint: string) => ({
      isSucceed: true,
      data: {
        id: '1',
        description: 'Test Role'
      }
    })),
    use: jest.fn(),
  } as jest.Mocked<ApiService>;

  const config: AuthServiceConfig = {
    apiService: mockApiService,
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
    localStorage: { removeItem: jest.fn() } as any,
  };
  const service = new AuthService(config);

  // Existing auth tests
  it('should call saveRegistration', async () => {
    await service.saveRegistration({});
    expect(mockApiService.post).toHaveBeenCalledWith('/account/register', {});
  });

  it('should call forgotPassword', async () => {
    await service.forgotPassword({});
    expect(mockApiService.post).toHaveBeenCalledWith('/account/forgot-password', {});
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
    expect(mockApiService.post).toHaveBeenCalledWith(
      '/api/v2/rest/auth/user/login-unsecure',
      {
        email: 'test@example.com',
        userName: 'user',
        phoneNumber: '123456789',
        password: 'pass',
        rememberMe: true,
        returnUrl: '/home'
      }
    );
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
