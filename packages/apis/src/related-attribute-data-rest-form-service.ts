// related-attribute-data-rest-form-service.ts
// Migrated from legacy RestRelatedAttributeDataFormService (mix-database-data-association/form)
import { BaseRestService } from '@mixcore/base';

/**
 * REST client for Mixcore Related Attribute Data Form endpoints.
 * Endpoint: mix-database-data-association/form
 */
export class RelatedAttributeDataRestFormService extends BaseRestService {
  declare protected config: any;
  private readonly endpoint = 'mix-database-data-association/form';

  constructor(config: any) {
    super(config);
  }

  async get<T = any>(endpoint: string = this.endpoint, params?: Record<string, any>): Promise<T> {
    // Implement actual GET logic or delegate to config
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
