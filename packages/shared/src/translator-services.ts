/**
 * TranslatorService
 * Framework-agnostic i18n/translation utility for Mixcore SDK
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Uses injected storage and API methods.
 */
export interface TranslatorServiceConfig {
  apiBaseUrl: string;
  apiKey?: string;
  getApiResult: (req: any) => Promise<any>;
  localStorage?: Storage;
}

export class TranslatorService {
  private config: TranslatorServiceConfig;
  private translator: { lang: string; data: any } | null = null;

  constructor(config: TranslatorServiceConfig) {
    this.config = config;
  }

  async fillTranslator(culture: string): Promise<any> {
    if (this.config.localStorage) {
      this.translator = this.config.localStorage.getItem('translator') as any;
      if (this.translator && this.translator.data && this.translator.lang === culture) {
        return this.translator;
      }
    }
    this.translator = await this.getTranslator(culture);
    return this.translator;
  }

  async getTranslator(culture: string): Promise<any> {
    if (this.config.localStorage) {
      const cached = this.config.localStorage.getItem('translator');
      if (cached && (cached as any).lang === culture) {
        return cached;
      }
    }
    const url = `/portal/${culture}/translator`;
    const req = { method: 'GET', url };
    const getData = await this.config.getApiResult(req);
    if (getData.isSucceed) {
      const translator = { lang: culture, data: getData.data };
      this.config.localStorage?.setItem('translator', JSON.stringify(translator));
      return translator;
    }
    return { lang: culture, data: null };
  }

  async reset(lang: string): Promise<void> {
    this.config.localStorage?.removeItem('translator');
    await this.getTranslator(lang);
  }

  get(keyword: string, defaultText?: string): string | undefined {
    if (!this.translator?.data) return defaultText;
    return this.translator.data[keyword] || defaultText;
  }
}
