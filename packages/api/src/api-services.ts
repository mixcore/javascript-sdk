/**
 * ApiService
 * Framework-agnostic, TypeScript-native API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface ApiServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export class ApiService {
  private config: ApiServiceConfig;

  constructor(config: ApiServiceConfig) {
    this.config = config;
  }

  /**
   * Generic GET request
   * @param endpoint - API endpoint
   * @param params - Optional query params
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, this.config.apiBaseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)));
    }
    const res = await fetch(url.toString(), {
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`GET ${url}: ${res.status} ${res.statusText}`);
    return res.json();
  }

  /**
   * Generic POST request
   * @param endpoint - API endpoint
   * @param data - Data to post
   */
  async post<T = any>(endpoint: string, data: any): Promise<T> {
    const url = new URL(endpoint, this.config.apiBaseUrl);
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`POST ${url}: ${res.status} ${res.statusText}`);
    return res.json();
  }

  /**
   * Generic DELETE request
   * @param endpoint - API endpoint
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    const url = new URL(endpoint, this.config.apiBaseUrl);
    const res = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`DELETE ${url}: ${res.status} ${res.statusText}`);
    return res.json();
  }
}
