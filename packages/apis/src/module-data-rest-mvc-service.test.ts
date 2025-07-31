import { ApiService } from './api-services';
import { ModuleDataRestMvcService } from './module-data-rest-mvc-service';

describe('ModuleDataRestMvcService', () => {
  let api: ApiService;
  let mvcService: ModuleDataRestMvcService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    mvcService = new ModuleDataRestMvcService(api);
  });

  it('should instantiate', () => {
    expect(mvcService).toBeInstanceOf(ModuleDataRestMvcService);
  });

  it('should throw if no moduleId provided', async () => {
    await expect(mvcService.initForm('')).rejects.toThrow('Missing moduleId');
  });

  it('should call initForm', async () => {
    api.get = jest.fn().mockResolvedValue({ form: {} });
    const result = await mvcService.initForm('mod123');
    expect(result).toEqual({ form: {} });
    expect(api.get).toHaveBeenCalledWith('/module-data/mvc/init-form/mod123');
  });
});
