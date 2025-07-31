
/**
 * CommonService: Framework-agnostic utility for Mixcore SDK
 * All SPA/Angular dependencies removed. Configuration must be injected.
 */

interface ApiResponse {
  isSucceed: boolean;
  data?: any;
  message?: string;
}

interface SharedSettings {
  [key: string]: any;
  culture?: string;
}

interface SitemapResult {
  urls: string[];
  generatedAt: string;
}

interface PermissionSet {
  [permission: string]: boolean;
}
export interface CommonServiceConfig {
  apiBaseUrl: string;
  getApiResult: (req: any) => Promise<any>;
  getRestApiResult: (req: any, ...args: any[]) => Promise<any>;
  getAnonymousApiResult: (req: any) => Promise<any>;
  localStorage?: Storage;
  onAlert?: (title: string, message: string) => void;
}

export class CommonService {
  private config: CommonServiceConfig;

  constructor(config: CommonServiceConfig) {
    this.config = config;
  }

  async loadJArrayData(name: string): Promise<any> {
    return this.config.getAnonymousApiResult({
      method: 'GET',
      url: `/portal/jarray-data/${name}`
    });
  }

  async stopApplication(): Promise<any> {
    return this.config.getRestApiResult({
      method: 'GET',
      url: '/rest/shared/stop-application'
    }, false, true);
  }

  async clearCache(): Promise<any> {
    return this.config.getRestApiResult({
      method: 'GET',
      url: '/rest/shared/clear-cache'
    }, false, true);
  }

  async loadJsonData(name: string): Promise<any> {
    return this.config.getAnonymousApiResult({
      method: 'GET',
      url: `/portal/json-data/${name}`
    });
  }

  async showAlertMsg(title: string, message: string): Promise<void> {
    if (typeof this.config.onAlert === 'function') {
      this.config.onAlert(title, message);
    } else {
      throw new Error(`${title}: ${message}`);
    }
  }

  checkFile(fileName: string, validExts: string[]): boolean {
    // Simple file extension check
    const ext = fileName.substring(fileName.lastIndexOf('.'));
    return validExts.includes(ext);
  }

  /**
   * Sends an email using the configured API endpoint
   * @param subject - Email subject
   * @param body - Email body content
   * @returns Promise with API response
   */
  async sendMail(subject: string, body: string): Promise<ApiResponse> {
    return this.config.getApiResult({
      method: 'POST',
      url: '/portal/sendmail',
      data: { subject, body }
    });
  }

  /**
   * Gets all shared settings, optionally filtered by culture
   * @param culture - Optional culture code to filter settings
   * @returns Promise with settings data
   */
  async getAllSettings(culture?: string): Promise<SharedSettings> {
    let url = '/rest/shared';
    if (culture) url += `/${culture}`;
    url += '/get-shared-settings';
    return this.config.getRestApiResult({
      method: 'GET',
      url
    }, false, true);
  }

  /**
   * Generates a sitemap using the portal API
   * @returns Promise with sitemap generation result
   */
  async generateSitemap(): Promise<SitemapResult> {
    return this.config.getApiResult({
      method: 'GET',
      url: '/portal/sitemap'
    });
  }

  /**
   * Gets user permissions from the API
   * @returns Promise with permissions data
   */
  async getPermissions(): Promise<PermissionSet> {
    return this.config.getRestApiResult({
      method: 'GET',
      url: '/rest/shared/permissions'
    });
  }

  // Add more methods as needed from legacy CommonService
}
