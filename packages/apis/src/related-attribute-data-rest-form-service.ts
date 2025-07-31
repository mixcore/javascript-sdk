// related-attribute-data-rest-form-service.ts
// Migrated from legacy RestRelatedAttributeDataFormService (mix-database-data-association/form)
import { BaseRestService } from '../../base/src';

/**
 * REST client for Mixcore Related Attribute Data Form endpoints.
 * Endpoint: mix-database-data-association/form
 */
export class RelatedAttributeDataRestFormService extends BaseRestService {
  constructor(config?: any) {
    super('mix-database-data-association/form', config);
  }
}
