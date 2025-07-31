import type { ApiService } from '@mixcore/api';
import type { ApiResult } from '@mixcore/api';

/**
 * MixDatabaseColumnRestService
 * TypeScript-native, framework-agnostic service for Mixcore database column portal operations.
 * Migrated and refactored from legacy AngularJS RestMixDatabaseColumnPortalService.
 */
export class MixDatabaseColumnRestService {
  private api: ApiService;
  private readonly prefixUrl: string = '/mix-database-column/portal';

  constructor(api: ApiService) {
    this.api = api;
  }

  /**
   * Initializes data for a Mixcore database column by name.
   * @param mixDatabaseName - The name of the Mixcore database
   * @returns API result
   */
  /**
   * Initializes data for a Mixcore database column by name. Returns ApiResult.
   */
  async initData(mixDatabaseName: string): Promise<ApiResult> {
    if (!mixDatabaseName) {
      return { isSucceed: false, errors: ['Missing mixDatabaseName'] };
    }
    const endpoint = `${this.prefixUrl}/init/${mixDatabaseName}`;
    return this.api.get(endpoint);
  }
}
