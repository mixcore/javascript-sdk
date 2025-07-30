
/**
 * BaseService
 * Abstract base class for Mixcore SDK services
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface BaseServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export abstract class BaseService {
  protected config: BaseServiceConfig;

  constructor(config: BaseServiceConfig) {
    this.config = config;
  }

  /**
   * Abstract method for error handling
   * @param error - Error object
   */
  abstract handleError(error: any): void;
}
