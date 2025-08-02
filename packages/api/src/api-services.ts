import type { ApiServiceConfig } from '@mixcore/shared';
import type { ApiResult, RestApiResult } from '@mixcore/shared';

export type { ApiResult, RestApiResult };

/**
 * ApiService
 * Framework-agnostic, TypeScript-native API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */

export type ApiServiceHook = {
  onRequest?: (req: RequestInit & { url: string }) => void | Promise<void>;
  onResponse?: (res: Response, req: RequestInit & { url: string }) => void | Promise<void>;
};

export interface ApiServiceConfigWithRefresh extends ApiServiceConfig {
  onRefreshToken?: () => Promise<string | null>;
}

export class ApiService implements ApiService {
  private config: ApiServiceConfigWithRefresh;
  private hooks: ApiServiceHook[] = [];

  constructor(config: ApiServiceConfigWithRefresh) {
    this.config = config;
  }

  /**
   * Internal helper to handle 401, refresh token, and retry once
   */
  private async handle401AndRetry(
    req: RequestInit & { url: string },
    doRequest: () => Promise<Response>,
    updateHeaders: (token: string) => void
  ): Promise<Response> {
    let res = await doRequest();
    if (res.status === 401 && this.config.onRefreshToken) {
      const newToken = await this.config.onRefreshToken();
      if (newToken) {
        this.config.apiKey = newToken;
        updateHeaders(newToken);
        res = await doRequest();
      }
    }
    return res;
  }

  /**
   * Register a request/response hook
   */
  use(hook: ApiServiceHook) {
    this.hooks.push(hook);
  }

  /**
   * Generic GET request (returns ApiResult)
   */
  async get(endpoint: string, params?: Record<string, any>): Promise<ApiResult> {
    const url = new URL(endpoint, this.config.apiBaseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)));
    }
    const req: RequestInit & { url: string } = {
      url: url.toString(),
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    };
    for (const hook of this.hooks) if (hook.onRequest) await hook.onRequest(req);
    const updateHeaders = (token: string) => {
      req.headers = { ...(req.headers || {}), Authorization: `Bearer ${token}` };
    };
    try {
      const doRequest = () => fetch(req.url, req);
      const res = await this.handle401AndRetry(req, doRequest, updateHeaders);
      for (const hook of this.hooks) if (hook.onResponse) await hook.onResponse(res, req);
      const data = await res.json().catch(() => undefined);
      if (!res.ok) {
        return { isSucceed: false, data, errors: [res.statusText], status: res.status };
      }
      return { isSucceed: true, data, status: res.status };
    } catch (err) {
      return { isSucceed: false, errors: [(err as Error).message] };
    }
  }

  /**
   * Generic POST request (returns ApiResult, supports JSON or FormData)
   */
  async post(endpoint: string, data: any, options?: { isFormData?: boolean }): Promise<ApiResult> {
    const url = new URL(endpoint, this.config.apiBaseUrl);
    let body: any = data;
    let headers: Record<string, string> = {};
    if (options?.isFormData) {
      // Let browser set Content-Type for FormData
      body = data;
    } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }
    if (this.config.apiKey) headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    const req: RequestInit & { url: string } = {
      url: url.toString(),
      method: 'POST',
      headers,
      body,
    };
    for (const hook of this.hooks) if (hook.onRequest) await hook.onRequest(req);
    const updateHeaders = (token: string) => {
      req.headers = { ...(req.headers || {}), Authorization: `Bearer ${token}` };
    };
    const doRequest = () => fetch(req.url, req);
    const res = await this.handle401AndRetry(req, doRequest, updateHeaders);
    for (const hook of this.hooks) if (hook.onResponse) await hook.onResponse(res, req);
    const respData = await res.json().catch(() => undefined);
    if (!res.ok) {
      return { isSucceed: false, data: respData, errors: [res.statusText], status: res.status };
    }
    return { isSucceed: true, data: respData, status: res.status };
  }

  /**
   * Generic DELETE request (returns ApiResult)
   */
  async delete(endpoint: string): Promise<ApiResult> {
    const url = new URL(endpoint, this.config.apiBaseUrl);
    const req: RequestInit & { url: string } = {
      url: url.toString(),
      method: 'DELETE',
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    };
    for (const hook of this.hooks) if (hook.onRequest) await hook.onRequest(req);
    const updateHeaders = (token: string) => {
      req.headers = { ...(req.headers || {}), Authorization: `Bearer ${token}` };
    };
    const doRequest = () => fetch(req.url, req);
    const res = await this.handle401AndRetry(req, doRequest, updateHeaders);
    for (const hook of this.hooks) if (hook.onResponse) await hook.onResponse(res, req);
    const data = await res.json().catch(() => undefined);
    if (!res.ok) {
      return { isSucceed: false, data, errors: [res.statusText], status: res.status };
    }
    return { isSucceed: true, data, status: res.status };
  }
}
