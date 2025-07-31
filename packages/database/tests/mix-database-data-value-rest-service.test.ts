import { ApiService } from './api-services';
import { MixDatabaseDataValueRestService } from './mix-database-data-value-rest-service';

describe('MixDatabaseDataValueRestService', () => {
  let api: ApiService;
  let valueService: MixDatabaseDataValueRestService;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    valueService = new MixDatabaseDataValueRestService(api);
  });

  it('should instantiate', () => {
    expect(valueService).toBeInstanceOf(MixDatabaseDataValueRestService);
  });

  // Add more tests as methods are implemented
});
