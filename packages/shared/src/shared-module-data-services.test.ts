import { SharedModuleDataService } from './shared-module-data-services';

describe('SharedModuleDataService', () => {
  it('should instantiate with config', () => {
    const svc = new SharedModuleDataService({ apiBaseUrl: 'https://api.example.com' });
    expect(svc).toBeInstanceOf(SharedModuleDataService);
  });
});
