// related-attribute-data-rest-portal-service.ts
// Migrated from legacy RestRelatedAttributeDataPortalService (mix-database-data-association/portal)
import { BaseRestService } from '@mixcore/base';
import type { ApiResult } from '@mixcore/api';

/**
 * REST client for Mixcore Related Attribute Data Portal endpoints.
 * Endpoint: mix-database-data-association/portal
 */
export class RelatedAttributeDataRestPortalService extends BaseRestService {
  declare protected config: any;
  private readonly endpoint = 'mix-database-data-association/portal';

  constructor(config: any) {
    super(config);
  }

  /**
   * GET request for related attribute data (returns ApiResult)
   */
  async get(endpoint: string = this.endpoint, params?: Record<string, any>): Promise<ApiResult> {
    if (typeof this.config.get === 'function') {
      return this.config.get(endpoint, params);
    }
    return { isSucceed: false, errors: ['GET method not implemented'] };
  }

  /**
   * POST request for related attribute data (returns ApiResult)
   */
  async post(endpoint: string = this.endpoint, data: any): Promise<ApiResult> {
    if (typeof this.config.post === 'function') {
      return this.config.post(endpoint, data);
    }
    return { isSucceed: false, errors: ['POST method not implemented'] };
  }

  /**
   * DELETE request for related attribute data (returns ApiResult)
   */
  async delete(endpoint: string = this.endpoint): Promise<ApiResult> {
    if (typeof this.config.delete === 'function') {
      return this.config.delete(endpoint);
    }
    return { isSucceed: false, errors: ['DELETE method not implemented'] };
  }

  /**
   * PUT request for related attribute data (returns ApiResult)
   */
  async put(endpoint: string = this.endpoint, data: any): Promise<ApiResult> {
    if (typeof this.config.put === 'function') {
      return this.config.put(endpoint, data);
    }
    return { isSucceed: false, errors: ['PUT method not implemented'] };
  }

  handleError(error: any): void {
    if (typeof this.config.handleError === 'function') {
      this.config.handleError(error);
    } else {
      throw error;
    }
  }
}
