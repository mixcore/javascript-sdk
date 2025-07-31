/**
 * Shared API types for Mixcore SDK
 * 
 * Contains types that need to be shared across packages to avoid circular dependencies
 */
export interface ApiServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export interface ApiResult {
  isSucceed: boolean;
  data?: any;
  errors?: string[];
  [key: string]: any;
}

export interface RestApiResult extends ApiResult {}