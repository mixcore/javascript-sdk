import type { ApiService } from '@mixcore/api';
import type { ApiResult } from '@mixcore/api';

/**
 * MixDatabaseRestPortalService
 * TypeScript-native, framework-agnostic service for Mixcore database portal operations.
 * Migrated and refactored from legacy AngularJS RestMixDatabasePortalService.
 */
export class MixDatabaseRestPortalService {
  private api: ApiService;
  private readonly prefixUrl: string = '/mix-database/portal';

  constructor(api: ApiService) {
    this.api = api;
  }

  /**
   * Triggers a migration for a Mixcore database entity.
   * @param data - Migration data (must include id)
   * @returns API result
   */
  /**
   * Triggers a migration for a Mixcore database entity. Returns ApiResult.
   */
  async migrate(data: { id: string; [key: string]: any }): Promise<ApiResult> {
    if (!data.id) {
      return { isSucceed: false, errors: ['Missing id for migration'] };
    }
    const endpoint = `${this.prefixUrl}/migrate/${data.id}`;
    return this.api.post(endpoint, data);
  }
}
