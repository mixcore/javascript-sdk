import { ApiService } from './api-services';
import { MixDatabaseColumnRestService } from './mix-database-column-rest-service';

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

  it('should throw if no mixDatabaseName provided', async () => {
    await expect(columnService.initData('')).rejects.toThrow('Missing mixDatabaseName');
  });

  it('should call initData', async () => {
    api.get = jest.fn().mockResolvedValue({ columns: [] });
    const result = await columnService.initData('testdb');
    expect(result).toEqual({ columns: [] });
    expect(api.get).toHaveBeenCalledWith('/mix-database-column/portal/init/testdb');
  });
});
