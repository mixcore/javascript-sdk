import { ApiService } from './api-services';
import { MixDatabaseRestPortalService } from './mix-database-rest-portal-service';

describe('MixDatabaseRestPortalService', () => {
  let api: ApiService;
  let dbService: MixDatabaseRestPortalService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    dbService = new MixDatabaseRestPortalService(api);
  });

  it('should instantiate', () => {
    expect(dbService).toBeInstanceOf(MixDatabaseRestPortalService);
  });

  it('should throw if no id provided', async () => {
    await expect(dbService.migrate({} as any)).rejects.toThrow('Missing id for migration');
  });

  it('should call migrate', async () => {
    const data = { id: '123', foo: 'bar' };
    api.post = jest.fn().mockResolvedValue({ success: true });
    const result = await dbService.migrate(data);
    expect(result).toEqual({ success: true });
    expect(api.post).toHaveBeenCalledWith('/mix-database/portal/migrate/123', data);
  });
});
