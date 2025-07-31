/**
 * AuthService
 * Framework-agnostic, TypeScript-native authentication API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
import type { ApiResult, RestApiResult } from '@mixcore/api';
import type { CryptoService } from '@mixcore/shared';
import type { ConfigurationService } from '@mixcore/config';

/**
 * Configuration for AuthService
 * Integrates with shared, api, and config domain packages.
 * @public
 */
export interface AuthServiceConfig {
  /** Base URL for API requests */
  apiBaseUrl: string;
  /** Optional API key for authentication */
  apiKey?: string;
  /** AES encryption function from shared domain */
  encryptAES: CryptoService['encryptAES'];
  /** Update authentication data in storage (shared/config) */
  updateAuthData: (data: any) => void;
  /** Fill authentication data from storage (shared/config) */
  fillAuthData: () => Promise<any>;
  /** Initialize all settings after login (config) */
  initAllSettings: () => Promise<void>;
  /** Generic API result fetcher (api domain) */
  getApiResult: (req: any) => Promise<ApiResult>;
  /** REST API result fetcher (api domain) */
  getRestApiResult: (req: any, ...args: any[]) => Promise<RestApiResult>;
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
      return await this.config.getApiResult({
        method: 'POST',
        url: '/account/register',
        data: registration,
      });
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
      return await this.config.getRestApiResult({
        method: 'POST',
        url: '/account/forgot-password',
        data: JSON.stringify(data),
      });
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
      return await this.config.getRestApiResult({
        method: 'POST',
        url: '/account/reset-password',
        data: JSON.stringify(data),
      });
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
    const data = {
      UserName: loginData.username,
      Password: loginData.password,
      RememberMe: loginData.rememberMe,
      Email: '',
      ReturnUrl: '',
    };
    const message = this.config.encryptAES(JSON.stringify(data));
    const req = {
      method: 'POST',
      url: '/account/login',
      data: JSON.stringify({ message }),
    };
    const resp = await this.config.getRestApiResult(req, true);
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
    const req = {
      method: 'POST',
      url: '/account/external-login',
      data: JSON.stringify({ message }),
    };
    const resp = await this.config.getRestApiResult(req, true);
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
    const req = {
      method: 'POST',
      url: '/account/refresh-token',
      data: JSON.stringify({ refreshToken: id, accessToken }),
    };
    const resp = await this.config.getApiResult(req);
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
}
