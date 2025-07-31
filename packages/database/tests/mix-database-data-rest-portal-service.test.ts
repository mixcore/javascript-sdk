import { ApiService } from '@mixcore/api';
import { MixDatabaseDataRestPortalService } from '../src/mix-database-data-rest-portal-service';

describe('MixDatabaseDataRestPortalService', () => {
  let api: ApiService;
  let portalService: MixDatabaseDataRestPortalService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'https://mixcore.net' });
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

  it('should return error if no mixDatabaseName for initData', async () => {
    const result = await portalService.initData('');
    expect(result.isSucceed).toBe(false);
    expect(result.errors).toContain('Missing mixDatabaseName');
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

  it('should return error if no mixDatabaseName for import', async () => {
    const result = await portalService.import('', new File([''], 'test.txt'));
    expect(result.isSucceed).toBe(false);
    expect(result.errors).toContain('Missing mixDatabaseName');
  });

  it('should return error if no file for import', async () => {
    const result = await portalService.import('testdb', null as any);
    expect(result.isSucceed).toBe(false);
    expect(result.errors).toContain('Missing file');
  });

  it('should call import', async () => {
    const fakeFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ imported: true }) });
    const result = await portalService.import('testdb', fakeFile);
    expect(result.data).toEqual({ imported: true });
    expect(result.isSucceed).toBe(true);
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it('should return error if no mixDatabaseId for migrate', async () => {
    const result = await portalService.migrate('');
    expect(result.isSucceed).toBe(false);
    expect(result.errors).toContain('Missing mixDatabaseId');
  });

  it('should call migrate', async () => {
    api.get = jest.fn().mockResolvedValue({ migrated: true });
    const result = await portalService.migrate('123');
    expect(result).toEqual({ migrated: true });
    expect(api.get).toHaveBeenCalledWith('/mix-database-data/portal/migrate-data/123');
  });
});
