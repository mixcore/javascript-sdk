import { ApiService } from '@mixcore/api';

export class TemplateService {
  private api: ApiService;
  private prefixUrl = 'template/portal';

  constructor(api: ApiService) {
    this.api = api;
  }

  /**
   * Copy a template by ID
   * @param id - Template ID
   */
  async copy(id: string) {
    const url = `${this.prefixUrl}/copy/${id}`;
    return this.api.get(url);
  }
}
