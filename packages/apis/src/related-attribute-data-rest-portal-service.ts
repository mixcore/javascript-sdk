// related-attribute-data-rest-portal-service.ts
// Migrated from legacy RestRelatedAttributeDataPortalService (mix-database-data-association/portal)
import { BaseRestService } from '@mixcore/base';

/**
 * REST client for Mixcore Related Attribute Data Portal endpoints.
 * Endpoint: mix-database-data-association/portal
 */
export class RelatedAttributeDataRestPortalService extends BaseRestService {
  constructor(config?: any) {
    super('mix-database-data-association/portal', config);
  }
}
