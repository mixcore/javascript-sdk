import { ApiService } from '@mixcore/api';
import { MixDatabaseColumnRestService } from '../src/mix-database-column-rest-service';

describe('MixDatabaseColumnRestService', () => {
  let api: ApiService;
  let columnService: MixDatabaseColumnRestService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    columnService = new MixDatabaseColumnRestService(api);
  });

  it('should instantiate', () => {
    expect(columnService).toBeInstanceOf(MixDatabaseColumnRestService);
  });

  it('should return error if no mixDatabaseName provided', async () => {
    const result = await columnService.initData('');
    expect(result.isSucceed).toBe(false);
    expect(result.errors).toContain('Missing mixDatabaseName');
  });

  it('should call initData', async () => {
    api.get = jest.fn().mockResolvedValue({ columns: [] });
    const result = await columnService.initData('testdb');
    expect(result).toEqual({ columns: [] });
    expect(api.get).toHaveBeenCalledWith('/mix-database-column/portal/init/testdb');
  });
});
