
/**
 * ModuleArticleService
 * Framework-agnostic, TypeScript-native article API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface ModuleArticleServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export class ModuleArticleService {
  private config: ModuleArticleServiceConfig;

  constructor(config: ModuleArticleServiceConfig) {
    this.config = config;
  }

  /**
   * Fetches articles for a module.
   * @param moduleId - The module identifier
   * @param params - Optional query params
   */
  async fetchArticles(moduleId: string, params?: Record<string, any>): Promise<any[]> {
    const url = new URL('/api/v2/rest/mixcore/module-article/get-module-article', this.config.apiBaseUrl);
    url.searchParams.append('moduleId', String(moduleId));
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
   * Creates a new article.
   * @param moduleId - The module identifier
   * @param data - Article data
   */
  async createArticle(moduleId: string, data: any): Promise<any> {
    const url = new URL(`/api/v2/rest/mixcore/module-article/${moduleId}`, this.config.apiBaseUrl);
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
   * Deletes an article.
   * @param moduleId - The module identifier
   * @param articleId - The article identifier
   */
  async deleteArticle(moduleId: string, articleId: string): Promise<boolean> {
    const url = new URL(`/api/v2/rest/mixcore/module-article/${moduleId}/${articleId}`, this.config.apiBaseUrl);
    const res = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`DELETE ${url}: ${res.status} ${res.statusText}`);
    return true;
  }
}
