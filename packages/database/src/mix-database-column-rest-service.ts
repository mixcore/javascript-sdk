import { ApiService } from './api-services';

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
  async initData(mixDatabaseName: string): Promise<any> {
    if (!mixDatabaseName) throw new Error('Missing mixDatabaseName');
    const endpoint = `${this.prefixUrl}/init/${mixDatabaseName}`;
    return this.api.get(endpoint);
  }
}
