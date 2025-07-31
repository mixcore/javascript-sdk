import { BaseService, BaseServiceConfig } from '../src/base-service';

class TestService extends BaseService {
  constructor(config: BaseServiceConfig) {
    super(config);
  }

  public handleError(error: Error): void {
    console.error('TestService error:', error);
  }
}

describe('BaseService', () => {
  const config: BaseServiceConfig = {
    apiBaseUrl: 'https://api.example.com',
    getApiResult: jest.fn().mockResolvedValue({}),
    getRestApiResult: jest.fn().mockResolvedValue({}),
    getAnonymousApiResult: jest.fn().mockResolvedValue({}),
  };

  const service = new TestService(config);

  it('should instantiate with config', () => {
    expect(service).toBeInstanceOf(TestService);
    expect(service['config']).toEqual(config);
  });

  it('should handle errors', () => {
    const mockError = new Error('Test error');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => service.handleError(mockError)).not.toThrow();
    expect(console.error).toHaveBeenCalledWith('TestService error:', mockError);
  });
});