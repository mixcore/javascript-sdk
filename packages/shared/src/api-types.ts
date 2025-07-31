/**
 * Shared API types for Mixcore SDK
 *
 * Contains types that need to be shared across packages to avoid circular dependencies
 */

export interface ApiServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
}

export interface ApiService {
  config: ApiServiceConfig;
  request<T = any>(options: {
    url: string;
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  }): Promise<T>;
  get<T = any>(url: string): Promise<T>;
  post<T = any>(url: string, body?: any): Promise<T>;
}

export interface UserServices {
  constructor(api: ApiService): void;
  // Add user service methods here
}

export interface TemplateService {
  constructor(api: ApiService): void;
  // Add template service methods here
}

export interface ConfigurationServices {
  constructor(api: ApiService): void;
  // Add config service methods here
}

export interface FileServices {
  getFile(folder: string, filename: string): Promise<any>;
  initFile(type: string): Promise<any>;
  getFiles(request: any): Promise<any>;
  removeFile(fullPath: string): Promise<any>;
  saveFile(file: any): Promise<any>;
  uploadFile(file: File, folder: string): Promise<any>;
}
export interface ApiServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export interface ApiService {
  config: ApiServiceConfig;
  request<T = any>(options: {
    url: string;
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  }): Promise<T>;
  get<T = any>(url: string): Promise<T>;
  post<T = any>(url: string, body?: any): Promise<T>;
}

export interface ApiResult {
  isSucceed: boolean;
  data?: any;
  errors?: string[];
  [key: string]: any;
}

export interface RestApiResult extends ApiResult {}