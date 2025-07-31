import { BaseRestService } from './base-rest-service';
import { BaseServiceConfig } from './base-service';

describe('BaseRestService', () => {
  class TestRestService extends BaseRestService {
    async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
      return { endpoint, params } as T;
    }
    async post<T = any>(endpoint: string, data: any): Promise<T> {
      return { endpoint, data } as T;
    }
    async delete<T = any>(endpoint: string): Promise<T> {
      return { endpoint } as T;
    }
    handleError(error: any): void {}
  }

  it('should construct and call methods', async () => {
    const config: BaseServiceConfig = { apiBaseUrl: 'https://mixcore.net' };
    const service = new TestRestService(config);
    expect(service).toBeInstanceOf(TestRestService);
    expect(await service.get('/test')).toHaveProperty('endpoint', '/test');
    expect(await service.post('/test', { foo: 'bar' })).toHaveProperty('endpoint', '/test');
    expect(await service.delete('/test')).toHaveProperty('endpoint', '/test');
  });
});
