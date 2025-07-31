import { ApiService } from '@mixcore/api';
import { MixDatabaseDataValueRestService } from '../src/mix-database-data-value-rest-service';

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
