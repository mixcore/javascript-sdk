import { BaseService, BaseServiceConfig } from './base-service';

describe('BaseService', () => {
  class TestService extends BaseService {
    handleError(error: any): void {
      // Custom error handling for test
    }
  }

  it('should construct with config', () => {
    const config: BaseServiceConfig = { apiBaseUrl: 'https://mixcore.net' };
    const service = new TestService(config);
    expect(service).toBeInstanceOf(TestService);
  });
});
