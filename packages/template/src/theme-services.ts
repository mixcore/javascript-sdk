/**
 * ThemeService
 * Framework-agnostic, TypeScript-native theme API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface ThemeServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  getRestApiResult: (req: any) => Promise<any>;
}

export class ThemeService {
  private config: ThemeServiceConfig;
  private prefixUrl = 'theme/portal';

  constructor(config: ThemeServiceConfig) {
    this.config = config;
  }

  async syncTemplates(id: string): Promise<any> {
    const url = `${this.prefixUrl}/sync/${id}`;
    const req = { method: 'GET', url };
    return this.config.getRestApiResult(req);
  }

  async install(objData: any): Promise<any> {
    const url = `${this.prefixUrl}/install`;
    const req = { method: 'POST', url, data: JSON.stringify(objData) };
    return this.config.getRestApiResult(req);
  }

  async export(id: string, objData: any): Promise<any> {
    const url = `${this.prefixUrl}/export/${id}`;
    const req = { method: 'POST', url, data: JSON.stringify(objData) };
    return this.config.getRestApiResult(req);
  }

  async getExportData(id: string): Promise<any> {
    const url = `${this.prefixUrl}/export/${id}`;
    const req = { method: 'GET', url };
    return this.config.getRestApiResult(req);
  }
}
