/**
 * ModuleDataService
 * Framework-agnostic, TypeScript-native data API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface ModuleDataServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export class ModuleDataService {
  private config: ModuleDataServiceConfig;

  constructor(config: ModuleDataServiceConfig) {
    this.config = config;
  }

  /**
   * Fetches data items for a module.
   * @param moduleId - The module identifier
   * @param params - Optional query params
   */
  async fetchDataItems(moduleId: string, params?: Record<string, any>): Promise<any[]> {
    const url = new URL('/api/v2/rest/mixcore/module-data/get-module-data', this.config.apiBaseUrl);
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
   * Creates a new data item.
   * @param moduleId - The module identifier
   * @param data - Data to create
   */
  async createDataItem(moduleId: string, data: any): Promise<any> {
    const url = new URL(`/api/v2/rest/mixcore/module-data/${moduleId}`, this.config.apiBaseUrl);
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

  /**
   * Deletes a data item.
   * @param moduleId - The module identifier
   * @param itemId - The data item identifier
   */
  async deleteDataItem(moduleId: string, itemId: string): Promise<boolean> {
    const url = new URL(`/api/v2/rest/mixcore/module-data/${moduleId}/${itemId}`, this.config.apiBaseUrl);
    const res = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`DELETE ${url}: ${res.status} ${res.statusText}`);
    return true;
  }
}
