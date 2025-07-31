/**
 * GlobalSettingsService
 * Framework-agnostic global settings utility for Mixcore SDK
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Uses injected storage and API methods.
 */
export interface GlobalSettingsServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  getApiResult: (req: any) => Promise<any>;
  localStorage?: Storage;
}

export class GlobalSettingsService {
  private config: GlobalSettingsServiceConfig;
  private globalSettings: { lang: string; data: any } | null = null;

  constructor(config: GlobalSettingsServiceConfig) {
    this.config = config;
  }

  async fillGlobalSettings(culture: string): Promise<any> {
    if (this.config.localStorage) {
      this.globalSettings = this.config.localStorage.getItem('globalSettings') as any;
      if (this.globalSettings && this.globalSettings.data && this.globalSettings.lang === culture) {
        return this.globalSettings;
      }
    }
    this.globalSettings = await this.getGlobalSettings(culture);
    return this.globalSettings;
  }

  async getGlobalSettings(culture: string): Promise<any> {
    if (this.config.localStorage) {
      const cached = this.config.localStorage.getItem('globalSettings');
      if (cached && (cached as any).lang === culture) {
        return cached;
      }
    }
    const url = `/portal/${culture}/global-settings`;
    const req = { method: 'GET', url };
    const getData = await this.config.getApiResult(req);
    if (getData.isSucceed) {
      const globalSettings = { lang: culture, data: getData.data };
      this.config.localStorage?.setItem('globalSettings', JSON.stringify(globalSettings));
      return globalSettings;
    }
    return { lang: culture, data: null };
  }

  async reset(lang: string): Promise<void> {
    this.config.localStorage?.removeItem('globalSettings');
    await this.getGlobalSettings(lang);
  }

  get(keyword: string, defaultText?: string): string | undefined {
    if (!this.globalSettings?.data) return defaultText;
    return this.globalSettings.data[keyword] || defaultText;
  }
}
