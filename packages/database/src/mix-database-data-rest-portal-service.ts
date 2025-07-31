import type { ApiService } from '@mixcore/api';
import type { ApiResult } from '@mixcore/api';

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

  /**
   * Saves additional data for a Mixcore database. Returns ApiResult.
   */
  async saveAdditionalData(objData: any): Promise<ApiResult> {
    const endpoint = `${this.prefixUrl}/save-additional-data`;
    return this.api.post(endpoint, objData);
  }

  /**
   * Gets additional data for a Mixcore database. Returns ApiResult.
   */
  async getAdditionalData(data?: any): Promise<ApiResult> {
    let endpoint = `${this.prefixUrl}/additional-data`;
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      const params = new URLSearchParams(data).toString();
      endpoint += `?${params}`;
    }
    return this.api.get(endpoint);
  }

  /**
   * Initializes data for a Mixcore database by name. Returns ApiResult.
   */
  async initData(mixDatabaseName: string): Promise<ApiResult> {
    if (!mixDatabaseName) {
      return { isSucceed: false, errors: ['Missing mixDatabaseName'] };
    }
    const endpoint = `${this.prefixUrl}/init/${mixDatabaseName}`;
    return this.api.get(endpoint);
  }

  /**
   * Exports data for a Mixcore database. Returns ApiResult.
   */
  async export(objData?: any): Promise<ApiResult> {
    let endpoint = `${this.prefixUrl}/export`;
    if (objData && typeof objData === 'object' && Object.keys(objData).length > 0) {
      const params = new URLSearchParams(objData).toString();
      endpoint += `?${params}`;
    }
    return this.api.get(endpoint);
  }

  /**
   * Imports data for a Mixcore database. Returns ApiResult.
   */
  async import(mixDatabaseName: string, file: File): Promise<ApiResult> {
    if (!mixDatabaseName) {
      return { isSucceed: false, errors: ['Missing mixDatabaseName'] };
    }
    if (!file) {
      return { isSucceed: false, errors: ['Missing file'] };
    }
    const endpoint = `${this.prefixUrl}/import-data/${mixDatabaseName}`;
    if (!mixDatabaseName) {
      return { isSucceed: false, errors: ['Missing mixDatabaseName'] };
    }
    if (!file) {
      return { isSucceed: false, errors: ['Missing file'] };
    }
    const formData = new FormData();
    formData.append('file', file);
    return this.api.post(endpoint, formData, { isFormData: true });
  }

  /**
   * Migrates data for a Mixcore database. Returns ApiResult.
   */
  async migrate(mixDatabaseId: string): Promise<ApiResult> {
    if (!mixDatabaseId) {
      return { isSucceed: false, errors: ['Missing mixDatabaseId'] };
    }
    const endpoint = `${this.prefixUrl}/migrate-data/${mixDatabaseId}`;
    return this.api.get(endpoint);
  }
}
