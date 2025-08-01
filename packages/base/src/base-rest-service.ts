import { BaseService, BaseServiceConfig } from './base-service';
import type { ApiResult } from '@mixcore/api';

/**
 * BaseRestService
 * Abstract base class for RESTful Mixcore SDK services
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export abstract class BaseRestService extends BaseService {
  constructor(config: BaseServiceConfig) {
    super(config);
  }

  /**
   * Abstract method for GET requests (returns ApiResult)
   * @param endpoint - API endpoint
   * @param params - Optional query params
   */
  abstract get(endpoint: string, params?: Record<string, any>): Promise<ApiResult>;

  /**
   * Abstract method for POST requests (returns ApiResult)
   * @param endpoint - API endpoint
   * @param data - Data to post
   */
  abstract post(endpoint: string, data: any): Promise<ApiResult>;

  /**
   * Abstract method for DELETE requests (returns ApiResult)
   * @param endpoint - API endpoint
   */
  abstract delete(endpoint: string): Promise<ApiResult>;

  /**
   * Abstract method for PUT requests (returns ApiResult)
   * @param endpoint - API endpoint
   * @param data - Data to put
   */
  abstract put(endpoint: string, data: any): Promise<ApiResult>;
}
