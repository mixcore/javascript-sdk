import type { ApiService } from '@mixcore/api';

/**
 * MixDatabaseDataValueRestService
 * TypeScript-native, framework-agnostic service for Mixcore database data value portal operations.
 * Migrated and refactored from legacy AngularJS RestMixDatabaseDataValuePortalService.
 */
export class MixDatabaseDataValueRestService {
  private api: ApiService;
  private readonly prefixUrl: string = '/mix-database-data-value/portal';

  constructor(api: ApiService) {
    this.api = api;
  }

  // Placeholder for future methods as needed
}
