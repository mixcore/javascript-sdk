import { ModuleDataService } from './module-data-services';

const config = {
  apiBaseUrl: 'https://mixcore.net',
  apiKey: process.env.MIXCORE_API_KEY || '',
};

describe('ModuleDataService', () => {
  const service = new ModuleDataService(config);

  it('fetchDataItems should return an array', async () => {
    const items = await service.fetchDataItems('1');
    expect(Array.isArray(items)).toBe(true);
  });

  // Note: createDataItem and deleteDataItem require valid credentials and real data
});
