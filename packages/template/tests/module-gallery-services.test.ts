import { ModuleGalleryService } from '../src/module-gallery-services';

// Mock fetch implementation
const mockFetch = jest.fn();
global.fetch = mockFetch;

const config = {
  apiBaseUrl: 'https://mixcore.net',
  apiKey: process.env.MIXCORE_API_KEY || '',
};

describe('ModuleGalleryService', () => {
  const service = new ModuleGalleryService(config);

  it('fetchGalleryItems should return an array', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([{ id: 1, name: 'test-item' }])
    });
    const items = await service.fetchGalleryItems('1');
    expect(items).toEqual([{ id: 1, name: 'test-item' }]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://mixcore.net/api/v2/rest/mix-portal/module-gallery?moduleId=1',
      { headers: undefined }
    );
  });

  // Note: uploadGalleryItem and deleteGalleryItem require valid credentials and real data
});
