import { ApiService } from './api-services';

/**
 * MixDatabaseDataRestPortalService
 * TypeScript-native, framework-agnostic service for Mixcore database data portal operations.
 * Migrated and refactored from legacy AngularJS RestMixDatabaseDataPortalService.
 */
export class MixDatabaseDataRestPortalService {
  private api: ApiService;
  private readonly prefixUrl: string = '/mix-database-data/portal';

  constructor(api: ApiService) {
    this.api = api;
  }

  async saveAdditionalData(objData: any): Promise<any> {
    const endpoint = `${this.prefixUrl}/save-additional-data`;
    return this.api.post(endpoint, objData);
  }

  async getAdditionalData(data?: any): Promise<any> {
    let endpoint = `${this.prefixUrl}/additional-data`;
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      const params = new URLSearchParams(data).toString();
      endpoint += `?${params}`;
    }
    return this.api.get(endpoint);
  }

  async initData(mixDatabaseName: string): Promise<any> {
    if (!mixDatabaseName) throw new Error('Missing mixDatabaseName');
    const endpoint = `${this.prefixUrl}/init/${mixDatabaseName}`;
    return this.api.get(endpoint);
  }

  async export(objData?: any): Promise<any> {
    let endpoint = `${this.prefixUrl}/export`;
    if (objData && typeof objData === 'object' && Object.keys(objData).length > 0) {
      const params = new URLSearchParams(objData).toString();
      endpoint += `?${params}`;
    }
    return this.api.get(endpoint);
  }

  async import(mixDatabaseName: string, file: File): Promise<any> {
    if (!mixDatabaseName) throw new Error('Missing mixDatabaseName');
    if (!file) throw new Error('Missing file');
    const endpoint = `${this.prefixUrl}/import-data/${mixDatabaseName}`;
    const formData = new FormData();
    formData.append('file', file);
    const url = new URL(endpoint, this.api['config'].apiBaseUrl).toString();
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: this.api['config'].apiKey ? { 'Authorization': `Bearer ${this.api['config'].apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`Import failed: ${res.status} ${res.statusText}`);
    return res.json();
  }

  async migrate(mixDatabaseId: string): Promise<any> {
    if (!mixDatabaseId) throw new Error('Missing mixDatabaseId');
    const endpoint = `${this.prefixUrl}/migrate-data/${mixDatabaseId}`;
    return this.api.get(endpoint);
  }
}
