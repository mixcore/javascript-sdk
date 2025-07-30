
import { BaseService, BaseServiceConfig } from './base-service';

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
   * Abstract method for GET requests
   * @param endpoint - API endpoint
   * @param params - Optional query params
   */
  abstract get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T>;

  /**
   * Abstract method for POST requests
   * @param endpoint - API endpoint
   * @param data - Data to post
   */
  abstract post<T = any>(endpoint: string, data: any): Promise<T>;

  /**
   * Abstract method for DELETE requests
   * @param endpoint - API endpoint
   */
  abstract delete<T = any>(endpoint: string): Promise<T>;
}
