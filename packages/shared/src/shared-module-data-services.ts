
/**
 * SharedModuleDataService
 * Framework-agnostic, TypeScript-native shared data service for Mixcore modules
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface SharedModuleDataServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export class SharedModuleDataService {
  private config: SharedModuleDataServiceConfig;

  constructor(config: SharedModuleDataServiceConfig) {
    this.config = config;
  }

  /**
   * Fetches shared data for a module.
   * @param moduleId - The module identifier
   * @param params - Optional query params
   */
  async fetchSharedData(moduleId: string, params?: Record<string, any>): Promise<any[]> {
    const url = new URL('/api/v2/rest/mixcore/shared-module-data/get-shared-data', this.config.apiBaseUrl);
    url.searchParams.append('moduleId', String(moduleId));
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)));
    }
    const res = await fetch(url.toString(), {
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`GET ${url}: ${res.status} ${res.statusText}`);
    return res.json();
  }

  /**
   * Updates shared data for a module.
   * @param moduleId - The module identifier
   * @param data - Data to update
   */
  async updateSharedData(moduleId: string, data: any): Promise<any> {
    const url = new URL(`/api/v2/rest/mixcore/shared-module-data/${moduleId}`, this.config.apiBaseUrl);
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`POST ${url}: ${res.status} ${res.statusText}`);
    return res.json();
  }
}
