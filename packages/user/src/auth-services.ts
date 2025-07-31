/**
 * AuthService
 * Framework-agnostic, TypeScript-native authentication API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
import type { ApiResult, RestApiResult, ApiService } from '@mixcore/api';
import type { CryptoService } from '@mixcore/shared';
import type { ConfigurationService } from '@mixcore/config';

/**
 * Configuration for AuthService
 * Integrates with shared, api, and config domain packages.
 * @public
 */
export interface AuthServiceConfig {
  /** ApiService instance for making API calls */
  apiService: ApiService;
  /** AES encryption function from shared domain */
  encryptAES?: CryptoService['encryptAES'];
  /** Update authentication data in storage (shared/config) */
  updateAuthData?: (data: any) => void;
  /** Fill authentication data from storage (shared/config) */
  fillAuthData?: () => Promise<any>;
  /** Initialize all settings after login (config) */
  initAllSettings: () => Promise<void>;
  /** Optional localStorage implementation (shared) */
  localStorage?: Storage;
  /** Optional plugin hooks for extensibility */
  plugins?: AuthServicePlugin[];
  /** Optional configuration service (config domain) */
  configurationService?: ConfigurationService;
}

/**
 * Plugin interface for AuthService extensibility
 * @public
 */
export interface AuthServicePlugin {
  /** Called after successful login */
  onLoginSuccess?(resp: any): Promise<void> | void;
  /** Called after logout */
  onLogout?(): Promise<void> | void;
}

/**
 * AuthService
 * Framework-agnostic, TypeScript-native authentication API client for Mixcore
 *
 * @remarks
 * All SPA dependencies removed. Configuration and plugins are injected.
 * All public APIs are typed and documented.
 *
 * @public
 */
export class AuthService {
  private config: AuthServiceConfig;
  public authentication: any = null;

  constructor(config: AuthServiceConfig) {
    this.config = config;
  }

  /**
   * Register a new user
   */
  /**
   * Register a new user
   * @param registration Registration data (shared domain types recommended)
   */
  async saveRegistration(registration: Record<string, any>): Promise<ApiResult> {
    try {
      return await this.config.apiService.post('/account/register', registration);
    } catch (err) {
      throw new Error('Registration failed: ' + (err as Error).message);
    }
  }

  /**
   * Request a password reset email
   */
  /**
   * Request a password reset email
   * @param data Forgot password request (shared domain types recommended)
   */
  async forgotPassword(data: Record<string, any>): Promise<RestApiResult> {
    try {
      const result = await this.config.apiService.post('/account/forgot-password', data);
      return result as RestApiResult;
    } catch (err) {
      throw new Error('Forgot password failed: ' + (err as Error).message);
    }
  }

  /**
   * Reset password with token
   */
  /**
   * Reset password with token
   * @param data Reset password request (shared domain types recommended)
   */
  async resetPassword(data: Record<string, any>): Promise<RestApiResult> {
    try {
      const result = await this.config.apiService.post('/account/reset-password', data);
      return result as RestApiResult;
    } catch (err) {
      throw new Error('Reset password failed: ' + (err as Error).message);
    }
  }

  /**
   * Login with username and password
   */
  /**
   * Login with username and password
   * @param loginData Login credentials (shared domain types recommended)
   */
  async login(loginData: { username: string; password: string; rememberMe?: boolean }): Promise<RestApiResult> {
    return this.loginUnsecure({
      userName: loginData.username,
      password: loginData.password,
      rememberMe: loginData.rememberMe,
      email: '',
      phoneNumber: '',
      returnUrl: ''
    });
  }

  /**
   * Unsecure login (framework-agnostic, legacy-compatible)
   * Only requires: getRestApiResult, updateAuthData, initAllSettings, plugins (optional)
   * @param loginData Login credentials (email, userName, phoneNumber, password, rememberMe, returnUrl)
   * @returns RestApiResult
   */
  async loginUnsecure(loginData: {
    email: string;
    userName: string;
    phoneNumber: string;
    password: string;
    rememberMe: boolean;
    returnUrl: string;
  }): Promise<RestApiResult> {
    // Legacy-compatible: always POST, expects JSON, handles errors gracefully
    try {
      const resp = await this.config.apiService.post(
        '/api/v2/rest/auth/user/login-unsecure',
        loginData
      ) as RestApiResult;

      if (resp && resp.isSucceed) {
        // Patch/normalize response if needed (legacy: resp.data)
        this.config.updateAuthData(resp.data);
        await this.config.initAllSettings();
        // Plugin hook
        if (this.config.plugins) {
          for (const plugin of this.config.plugins) {
            if (plugin.onLoginSuccess) await plugin.onLoginSuccess(resp);
          }
        }
      }
      return resp;
    } catch (err) {
      // Legacy: error normalization
      return {
        isSucceed: false,
        errors: [(err as Error).message],
        data: null
      } as RestApiResult;
    }
  }

  /**
   * Login with external provider
   */
  /**
   * Login with external provider
   * @param loginData External login credentials (shared domain types recommended)
   * @param provider Provider name
   */
  async externalLogin(loginData: { username: string; email: string; accessToken: string }, provider: string): Promise<RestApiResult> {
    const data = {
      provider,
      username: loginData.username,
      email: loginData.email,
      externalAccessToken: loginData.accessToken,
    };
    const message = this.config.encryptAES(JSON.stringify(data));
    const resp = await this.config.apiService.post(
      '/account/external-login',
      { message }
    ) as RestApiResult;
    if (resp.isSucceed) {
      this.config.updateAuthData(resp.data);
      await this.config.initAllSettings();
      // Plugin hook
      if (this.config.plugins) {
        for (const plugin of this.config.plugins) {
          if (plugin.onLoginSuccess) await plugin.onLoginSuccess(resp);
        }
      }
    }
    return resp;
  }

  /**
   * Log out the current user
   */
  /**
   * Log out the current user
   * Integrates with shared and config domain for storage and plugin hooks.
   */
  async logOut(): Promise<void> {
    if (this.config.localStorage) {
      this.config.localStorage.removeItem('authorizationData');
    }
    // Plugin hook
    if (this.config.plugins) {
      for (const plugin of this.config.plugins) {
        if (plugin.onLogout) await plugin.onLogout();
      }
    }
    // Optionally, call /account/logout endpoint if needed
    // Optionally, use configurationService for additional cleanup
    if (this.config.configurationService) {
      if (this.config.configurationService && 'clear' in this.config.configurationService) {
        await (this.config.configurationService as any).clear();
      }
    }
  }

  /**
   * Fill authentication data from storage
   */
  /**
   * Fill authentication data from storage (shared/config domain)
   */
  async fillAuthData(): Promise<void> {
    this.authentication = await this.config.fillAuthData();
  }

  /**
   * Refresh authentication token
   */
  /**
   * Refresh authentication token (api domain)
   */
  async refreshToken(id: string, accessToken: string): Promise<ApiResult | void> {
    if (!id) return this.logOut();
    const resp = await this.config.apiService.post(
      '/account/refresh-token',
      { refreshToken: id, accessToken }
    );
    if (resp.isSucceed) {
      return this.config.updateAuthData(resp.data);
    } else {
      await this.logOut();
    }
  }

  /**
   * Check if user is in a given role
   */
  isInRole(roleName: string): boolean {
    if (!this.authentication || !this.authentication.info) return false;
    const roles = this.authentication.info.userRoles || [];
    return roles.some((m: any) => m.description === roleName && m.isActived);
  }

  async getRoles(): Promise<ApiResult> {
    return this.config.apiService.get('/api/v2/rest/auth/role');
  }

  async createRole(data: {description: string}): Promise<ApiResult> {
    return this.config.apiService.post('/api/v2/rest/auth/role/create', data);
  }

  async updateRole(id: string, data: {description: string}): Promise<ApiResult> {
    return this.config.apiService.post(`/api/v2/rest/auth/role/${id}`, data);
  }

  async deleteRole(id: string): Promise<ApiResult> {
    return this.config.apiService.delete(`/api/v2/rest/auth/role/${id}`);
  }

  async getDefaultRole(): Promise<ApiResult> {
    return this.config.apiService.get('/api/v2/rest/auth/role/default');
  }
}
