import { ApiService } from '@mixcore/api';
import { TemplateService } from '../src/template-service';

describe('TemplateService', () => {
  let api: ApiService;
  let templateService: TemplateService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    templateService = new TemplateService(api);
  });

  it('should instantiate', () => {
    expect(templateService).toBeInstanceOf(TemplateService);
  });

  it('should call copy', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'copy' }) });
    const result = await templateService.copy('123');
    expect(result).toEqual({ id: 'copy' });
  });
});
