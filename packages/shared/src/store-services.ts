/**
 * StoreService
 * Framework-agnostic, TypeScript-native store API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface StoreServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  getRestApiResult: (req: any) => Promise<any>;
}

export class StoreService {
  private config: StoreServiceConfig;
  private serviceBase = 'https://store.mixcore.org';

  constructor(config: StoreServiceConfig) {
    this.config = config;
  }

  async getThemes(objData?: Record<string, any>): Promise<any> {
    const params = objData ? this.parseQuery(objData) : '';
    let url = '/rest/en-us/post/client';
    if (params) url += '?' + params;
    const req = { serviceBase: this.serviceBase, method: 'GET', url };
    return this.config.getRestApiResult(req);
  }

  async getCategories(objData?: Record<string, any>): Promise<any> {
    const params = objData ? this.parseQuery(objData) : '';
    let url = '/rest/en-us/mix-database-data/client';
    if (params) url += '?' + params;
    const req = { serviceBase: this.serviceBase, method: 'GET', url };
    return this.config.getRestApiResult(req);
  }

  private parseQuery(obj: Record<string, any>): string {
    return Object.entries(obj)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
  }
}
