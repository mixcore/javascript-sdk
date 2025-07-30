import { BaseService, BaseServiceConfig } from './base-service';

describe('BaseService', () => {
  class TestService extends BaseService {
    handleError(error: any) {}
  }
  it('should instantiate with config', () => {
    const svc = new TestService({ apiBaseUrl: 'https://api.example.com' });
    expect(svc).toBeInstanceOf(TestService);
  });
});
