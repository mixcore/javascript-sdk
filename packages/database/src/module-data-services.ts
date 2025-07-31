/**
 * ModuleDataService
 * Framework-agnostic, TypeScript-native data API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
import type { ApiResult } from '@mixcore/api';

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
  /**
   * Fetches data items for a module. Returns ApiResult.
   */
  async fetchDataItems(moduleId: string, params?: Record<string, any>): Promise<ApiResult> {
    const url = new URL('/api/v2/rest/mixcore/module-data/get-module-data', this.config.apiBaseUrl);
    url.searchParams.append('moduleId', String(moduleId));
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)));
    }
    try {
      const res = await fetch(url.toString(), {
        headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
      });
      const data = await res.json().catch(() => undefined);
      if (!res.ok) {
        return { isSucceed: false, data, errors: [res.statusText], status: res.status };
      }
      return { isSucceed: true, data, status: res.status };
    } catch (err) {
      return { isSucceed: false, errors: [(err as Error).message] };
    }
  }

  /**
   * Creates a new data item.
   * @param moduleId - The module identifier
   * @param data - Data to create
   */
  /**
   * Creates a new data item. Returns ApiResult.
   */
  async createDataItem(moduleId: string, data: any): Promise<ApiResult> {
    const url = new URL(`/api/v2/rest/mixcore/module-data/${moduleId}`, this.config.apiBaseUrl);
    try {
      const res = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
        },
        body: JSON.stringify(data),
      });
      const respData = await res.json().catch(() => undefined);
      if (!res.ok) {
        return { isSucceed: false, data: respData, errors: [res.statusText], status: res.status };
      }
      return { isSucceed: true, data: respData, status: res.status };
    } catch (err) {
      return { isSucceed: false, errors: [(err as Error).message] };
    }
  }

  /**
   * Deletes a data item.
   * @param moduleId - The module identifier
   * @param itemId - The data item identifier
   */
  /**
   * Deletes a data item. Returns ApiResult.
   */
  async deleteDataItem(moduleId: string, itemId: string): Promise<ApiResult> {
    const url = new URL(`/api/v2/rest/mixcore/module-data/${moduleId}/${itemId}`, this.config.apiBaseUrl);
    try {
      const res = await fetch(url.toString(), {
        method: 'DELETE',
        headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
      });
      if (!res.ok) {
        return { isSucceed: false, errors: [res.statusText], status: res.status };
      }
      return { isSucceed: true, status: res.status };
    } catch (err) {
      return { isSucceed: false, errors: [(err as Error).message] };
    }
  }
}
