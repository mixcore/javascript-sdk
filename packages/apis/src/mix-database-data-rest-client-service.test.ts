import { ApiService } from './api-services';
import { MixDatabaseDataRestClientService } from './mix-database-data-rest-client-service';

describe('MixDatabaseDataRestClientService', () => {
  let api: ApiService;
  let clientService: MixDatabaseDataRestClientService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    clientService = new MixDatabaseDataRestClientService(api);
  });

  it('should instantiate', () => {
    expect(clientService).toBeInstanceOf(MixDatabaseDataRestClientService);
  });

  it('should throw if no mixDatabaseName for initData', async () => {
    await expect(clientService.initData('')).rejects.toThrow('Missing mixDatabaseName');
  });

  it('should call initData', async () => {
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const result = await clientService.initData('testdb');
    expect(result).toEqual({ data: [] });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/form/init/testdb');
  });

  it('should throw if no mixDatabaseName for saveData', async () => {
    await expect(clientService.saveData('', {})).rejects.toThrow('Missing mixDatabaseName');
  });

  it('should call saveData', async () => {
    api.post = jest.fn().mockResolvedValue({ success: true });
    const result = await clientService.saveData('testdb', { foo: 'bar' }, true);
    expect(result).toEqual({ success: true });
    expect(api.post).toHaveBeenCalledWith('/mix-database-data/form/save-data/testdb/true', { foo: 'bar' });
  });

  it('should throw if no dataId for saveValues', async () => {
    await expect(clientService.saveValues('', {})).rejects.toThrow('Missing dataId');
  });

  it('should call saveValues', async () => {
    api.post = jest.fn().mockResolvedValue({ ok: true });
    const result = await clientService.saveValues('123', { foo: 'bar' });
    expect(result).toEqual({ ok: true });
    expect(api.post).toHaveBeenCalledWith('/mix-database-data/form/save-values/123', { foo: 'bar' });
  });
});
