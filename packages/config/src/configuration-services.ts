import { ApiService } from '@mixcore/api';
import { ApiServiceConfig } from '@mixcore/shared';

/**
 * ConfigurationServices
 * TypeScript-native, framework-agnostic service for configuration management.
 * Migrated and refactored from legacy AngularJS ConfigurationService.
 */
export interface ConfigurationUpload {
  file: File;
  folder?: string;
  title?: string;
  description?: string;
}

export class ConfigurationServices {
  private api: ApiService;
  private readonly prefixUrl: string = '/configuration';

  constructor(api: ApiService) {
    this.api = api;
  }

  /**
   * Uploads a configuration file.
   * @param configurationFile - The configuration file and metadata
   * @returns API result
   */
  async uploadConfiguration(configurationFile: ConfigurationUpload): Promise<any> {
    if (!configurationFile.file) {
      throw new Error('No file provided');
    }
    const formData = new FormData();
    formData.append(configurationFile.file.name, configurationFile.file);
    if (configurationFile.folder) formData.append('fileFolder', configurationFile.folder);
    if (configurationFile.title) formData.append('title', configurationFile.title);
    if (configurationFile.description) formData.append('description', configurationFile.description);

    const req = {
      url: this.prefixUrl + '/upload',
      method: 'POST',
      body: formData,
      headers: {},
    };
    // Use fetch directly for FormData, bypassing ApiService's JSON logic
    const url = new URL(req.url, this.api['config'].apiBaseUrl).toString();
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      // Let browser set Content-Type for FormData
      headers: this.api['config'].apiKey ? { 'Authorization': `Bearer ${this.api['config'].apiKey}` } : undefined,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
    return res.json();
  }
}
