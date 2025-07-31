/**
 * AuthService
 * Framework-agnostic, TypeScript-native authentication API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface AuthServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  encryptAES: (data: string) => string;
  updateAuthData: (data: any) => void;
  fillAuthData: () => Promise<any>;
  initAllSettings: () => Promise<void>;
  getApiResult: (req: any) => Promise<any>;
  getRestApiResult: (req: any, ...args: any[]) => Promise<any>;
  localStorage?: Storage;
}

export class AuthService {
  private config: AuthServiceConfig;
  public authentication: any = null;

  constructor(config: AuthServiceConfig) {
    this.config = config;
  }

  async saveRegistration(registration: any): Promise<any> {
    return this.config.getApiResult({
      method: 'POST',
      url: '/account/register',
      data: registration,
    });
  }

  async forgotPassword(data: any): Promise<any> {
    return this.config.getRestApiResult({
      method: 'POST',
      url: '/account/forgot-password',
      data: JSON.stringify(data),
    });
  }

  async resetPassword(data: any): Promise<any> {
    return this.config.getRestApiResult({
      method: 'POST',
      url: '/account/reset-password',
      data: JSON.stringify(data),
    });
  }

  async login(loginData: { username: string; password: string; rememberMe?: boolean }): Promise<any> {
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
    }
    return resp;
  }

  async externalLogin(loginData: any, provider: string): Promise<any> {
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
    }
    return resp;
  }

  async logOut(): Promise<void> {
    if (this.config.localStorage) {
      this.config.localStorage.removeItem('authorizationData');
    }
    // Optionally, call /account/logout endpoint if needed
  }

  async fillAuthData(): Promise<void> {
    this.authentication = await this.config.fillAuthData();
  }

  async refreshToken(id: string, accessToken: string): Promise<any> {
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
      return this.logOut();
    }
  }

  isInRole(roleName: string): boolean {
    if (!this.authentication || !this.authentication.info) return false;
    const roles = this.authentication.info.userRoles || [];
    return roles.some((m: any) => m.description === roleName && m.isActived);
  }
}
