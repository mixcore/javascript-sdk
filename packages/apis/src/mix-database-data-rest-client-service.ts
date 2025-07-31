import { ApiService } from './api-services';

/**
 * MixDatabaseDataRestClientService
 * TypeScript-native, framework-agnostic service for Mixcore database data client operations.
 * Migrated and refactored from legacy AngularJS RestMixDatabaseDataClientService.
 */
export class MixDatabaseDataRestClientService {
  private api: ApiService;
  private readonly prefixUrl: string = '/mix-database-data/form';

  constructor(api: ApiService) {
    this.api = api;
  }

  /**
   * Initializes data for a Mixcore database by name.
   * @param mixDatabaseName - The name of the Mixcore database
   * @returns API result
   */
  async initData(mixDatabaseName: string): Promise<any> {
    if (!mixDatabaseName) throw new Error('Missing mixDatabaseName');
    const endpoint = `${this.prefixUrl}/init/${mixDatabaseName}`;
    return this.api.get(endpoint);
  }

  /**
   * Saves data for a Mixcore database.
   * @param mixDatabaseName - The name of the Mixcore database
   * @param objData - Data to save
   * @param sendMail - Whether to send mail (default: false)
   * @returns API result
   */
  async saveData(mixDatabaseName: string, objData: any, sendMail = false): Promise<any> {
    if (!mixDatabaseName) throw new Error('Missing mixDatabaseName');
    const endpoint = `${this.prefixUrl}/save-data/${mixDatabaseName}/${sendMail}`;
    return this.api.post(endpoint, objData);
  }

  /**
   * Saves values for a Mixcore database data entry.
   * @param dataId - Data entry ID
   * @param objData - Values to save
   * @returns API result
   */
  async saveValues(dataId: string, objData: any): Promise<any> {
    if (!dataId) throw new Error('Missing dataId');
    const endpoint = `${this.prefixUrl}/save-values/${dataId}`;
    return this.api.post(endpoint, objData);
  }
}
