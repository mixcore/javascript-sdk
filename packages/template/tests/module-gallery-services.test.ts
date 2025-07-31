import { ModuleGalleryService } from './module-gallery-services';

const config = {
  apiBaseUrl: 'https://mixcore.net',
  apiKey: process.env.MIXCORE_API_KEY || '',
};

describe('ModuleGalleryService', () => {
  const service = new ModuleGalleryService(config);

  it('fetchGalleryItems should return an array', async () => {
    const items = await service.fetchGalleryItems('1');
    expect(Array.isArray(items)).toBe(true);
  });

  // Note: uploadGalleryItem and deleteGalleryItem require valid credentials and real data
});
