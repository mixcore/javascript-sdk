import { ModuleArticleService } from '../src/module-article-services';

// Mock fetch implementation
const mockFetch = jest.fn();
global.fetch = mockFetch;

const config = {
  apiBaseUrl: 'https://mixcore.net',
  apiKey: process.env.MIXCORE_API_KEY || '',
};

describe('ModuleArticleService', () => {
  const service = new ModuleArticleService(config);

  it('fetchArticles should return an array', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([{ id: 1, title: 'test-article' }])
    });
    const articles = await service.fetchArticles('1');
    expect(articles).toEqual([{ id: 1, title: 'test-article' }]);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://mixcore.net/api/v2/rest/mix-portal/module-article?moduleId=1',
      { headers: undefined }
    );
  });

  // Note: createArticle and deleteArticle require valid credentials and real data
});
