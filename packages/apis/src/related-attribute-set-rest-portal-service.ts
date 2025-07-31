// related-attribute-set-rest-portal-service.ts
// Migrated from legacy RestRelatedMixDatabasePortalService (related-mix-database/portal)
import { BaseRestService } from '@mixcore/base';

/**
 * REST client for Mixcore Related Attribute Set Portal endpoints.
 * Endpoint: related-mix-database/portal
 */
export class RelatedAttributeSetRestPortalService extends BaseRestService {
  constructor(config?: any) {
    super('related-mix-database/portal', config);
  }
}
