
/**
 * ModuleGalleryService
 * Framework-agnostic, TypeScript-native gallery API client for Mixcore
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Configuration is injected via constructor.
 */
export interface ModuleGalleryServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export class ModuleGalleryService {
  private config: ModuleGalleryServiceConfig;

  constructor(config: ModuleGalleryServiceConfig) {
    this.config = config;
  }

  /**
   * Fetches gallery items for a module.
   * @param moduleId - The module identifier
   * @param params - Optional query params
   */
  async fetchGalleryItems(moduleId: string, params?: Record<string, any>): Promise<any[]> {
    const url = new URL('/api/v2/rest/mix-portal/module-gallery', this.config.apiBaseUrl);
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
   * Uploads a new gallery item.
   * @param moduleId - The module identifier
   * @param file - File or data to upload
   * @param meta - Optional metadata
   */
  async uploadGalleryItem(moduleId: string, file: File | Blob, meta?: Record<string, any>): Promise<any> {
    const url = new URL(`/api/v2/rest/mixcore/module-gallery/${moduleId}/upload`, this.config.apiBaseUrl);
    const formData = new FormData();
    formData.append('file', file);
    if (meta) {
      Object.entries(meta).forEach(([k, v]) => formData.append(k, String(v)));
    }
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}),
      },
      body: formData,
    });
    if (!res.ok) throw new Error(`POST ${url}: ${res.status} ${res.statusText}`);
    return res.json();
  }

  /**
   * Deletes a gallery item.
   * @param moduleId - The module identifier
   * @param itemId - The gallery item identifier
   */
  async deleteGalleryItem(moduleId: string, itemId: string): Promise<boolean> {
    const url = new URL(`/api/v2/rest/mixcore/module-gallery/${moduleId}/${itemId}`, this.config.apiBaseUrl);
    const res = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`DELETE ${url}: ${res.status} ${res.statusText}`);
    return true;
  }
}
