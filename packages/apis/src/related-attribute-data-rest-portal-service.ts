// related-attribute-data-rest-portal-service.ts
// Migrated from legacy RestRelatedAttributeDataPortalService (mix-database-data-association/portal)
import { BaseRestService } from '@mixcore/base';

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

  async get<T = any>(endpoint: string = this.endpoint, params?: Record<string, any>): Promise<T> {
    if (typeof this.config.get === 'function') {
      return this.config.get(endpoint, params);
    }
    throw new Error('GET method not implemented');
  }

  async post<T = any>(endpoint: string = this.endpoint, data: any): Promise<T> {
    if (typeof this.config.post === 'function') {
      return this.config.post(endpoint, data);
    }
    throw new Error('POST method not implemented');
  }

  async delete<T = any>(endpoint: string = this.endpoint): Promise<T> {
    if (typeof this.config.delete === 'function') {
      return this.config.delete(endpoint);
    }
    throw new Error('DELETE method not implemented');
  }

  handleError(error: any): void {
    if (typeof this.config.handleError === 'function') {
      this.config.handleError(error);
    } else {
      throw error;
    }
  }
}
