// related-attribute-data-rest-portal-service.ts
// Migrated from legacy RestRelatedAttributeDataPortalService (mix-database-data-association/portal)
import { BaseRestService } from '../../base/src';

/**
 * REST client for Mixcore Related Attribute Data Portal endpoints.
 * Endpoint: mix-database-data-association/portal
 */
export class RelatedAttributeDataRestPortalService extends BaseRestService {
  constructor(config?: any) {
    super('mix-database-data-association/portal', config);
  }
}
