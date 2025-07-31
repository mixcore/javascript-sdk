import { ApiService, ApiResult } from '@mixcore/api';
import { MixDatabaseRestPortalService } from '../src/mix-database-rest-portal-service';

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

  it('should return error if no id provided', async () => {
    const result = await dbService.migrate({} as any);
    expect(result).toEqual({
      errors: ['Missing id for migration'],
      isSucceed: false
    });
  });

  it('should call migrate', async () => {
    const data = { id: '123', foo: 'bar' };
    api.post = jest.fn().mockResolvedValue({ success: true });
    const result = await dbService.migrate(data);
    expect(result).toEqual({ success: true });
    expect(api.post).toHaveBeenCalledWith('/mix-database/portal/migrate/123', data);
  });
});
