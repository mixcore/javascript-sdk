import { ApiService } from './api-services';

/**
 * ModuleDataRestMvcService
 * TypeScript-native, framework-agnostic service for Mixcore module data MVC operations.
 * Migrated and refactored from legacy AngularJS RestMvcModuleDataService.
 */
export class ModuleDataRestMvcService {
  private api: ApiService;
  private readonly prefixUrl: string = '/module-data/mvc';

  constructor(api: ApiService) {
    this.api = api;
  }

  /**
   * Initializes a form for a module by ID.
   * @param moduleId - The module ID
   * @returns API result
   */
  async initForm(moduleId: string): Promise<any> {
    if (!moduleId) throw new Error('Missing moduleId');
    const endpoint = `${this.prefixUrl}/init-form/${moduleId}`;
    return this.api.get(endpoint);
  }
}
