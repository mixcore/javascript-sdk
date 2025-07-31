import { ApiService } from './api-services';
import { MixDatabaseDataRestPortalService } from './mix-database-data-rest-portal-service';

describe('MixDatabaseDataRestPortalService', () => {
  let api: ApiService;
  let portalService: MixDatabaseDataRestPortalService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    portalService = new MixDatabaseDataRestPortalService(api);
  });

  it('should instantiate', () => {
    expect(portalService).toBeInstanceOf(MixDatabaseDataRestPortalService);
  });

  it('should call saveAdditionalData', async () => {
    api.post = jest.fn().mockResolvedValue({ ok: true });
    const result = await portalService.saveAdditionalData({ foo: 'bar' });
    expect(result).toEqual({ ok: true });
    expect(api.post).toHaveBeenCalledWith('/mix-database-data/portal/save-additional-data', { foo: 'bar' });
  });

  it('should call getAdditionalData with params', async () => {
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const result = await portalService.getAdditionalData({ a: 1 });
    expect(result).toEqual({ data: [] });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/portal/additional-data?a=1');
  });

  it('should call getAdditionalData without params', async () => {
    api.get = jest.fn().mockResolvedValue({ data: [] });
    const result = await portalService.getAdditionalData();
    expect(result).toEqual({ data: [] });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/portal/additional-data');
  });

  it('should throw if no mixDatabaseName for initData', async () => {
    await expect(portalService.initData('')).rejects.toThrow('Missing mixDatabaseName');
  });

  it('should call initData', async () => {
    api.get = jest.fn().mockResolvedValue({ ok: true });
    const result = await portalService.initData('testdb');
    expect(result).toEqual({ ok: true });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/portal/init/testdb');
  });

  it('should call export with params', async () => {
    api.get = jest.fn().mockResolvedValue({ ok: true });
    const result = await portalService.export({ foo: 'bar' });
    expect(result).toEqual({ ok: true });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/portal/export?foo=bar');
  });

  it('should call export without params', async () => {
    api.get = jest.fn().mockResolvedValue({ ok: true });
    const result = await portalService.export();
    expect(result).toEqual({ ok: true });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/portal/export');
  });

  it('should throw if no mixDatabaseName for import', async () => {
    await expect(portalService.import('', new File([''], 'test.txt'))).rejects.toThrow('Missing mixDatabaseName');
  });

  it('should throw if no file for import', async () => {
    await expect(portalService.import('testdb', null as any)).rejects.toThrow('Missing file');
  });

  it('should call import', async () => {
    const fakeFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ imported: true }) });
    const result = await portalService.import('testdb', fakeFile);
    expect(result).toEqual({ imported: true });
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it('should throw if no mixDatabaseId for migrate', async () => {
    await expect(portalService.migrate('')).rejects.toThrow('Missing mixDatabaseId');
  });

  it('should call migrate', async () => {
    api.get = jest.fn().mockResolvedValue({ migrated: true });
    const result = await portalService.migrate('123');
    expect(result).toEqual({ migrated: true });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/portal/migrate-data/123');
  });
});
