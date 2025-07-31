import { ModuleDataService } from '../src/module-data-services';
import { ApiService } from '@mixcore/api';

const api = new ApiService({ apiBaseUrl: 'https://mixcore.net' });
const config = {
  apiBaseUrl: 'https://mixcore.net',
  api,
  apiKey: process.env.MIXCORE_API_KEY || '',
};

describe('ModuleDataService', () => {
  const service = new ModuleDataService(config);

  beforeEach(() => {
    // Mock API response to match ApiResult format expected by service
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        items: []
      })
    });
  });

  it('fetchDataItems should return an array', async () => {
    const result = await service.fetchDataItems('1');
    console.log('Test result:', result);
    expect(result).toBeDefined();
    expect(result.data).toBeDefined();
    expect(result.data.items).toBeDefined();
    expect(Array.isArray(result.data.items)).toBe(true);
  });

  // Note: createDataItem and deleteDataItem require valid credentials and real data
});
