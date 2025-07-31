import { ModuleArticleService } from './module-article-services';

const config = {
  apiBaseUrl: 'https://mixcore.net',
  apiKey: process.env.MIXCORE_API_KEY || '',
};

describe('ModuleArticleService', () => {
  const service = new ModuleArticleService(config);

  it('fetchArticles should return an array', async () => {
    const articles = await service.fetchArticles('1');
    expect(Array.isArray(articles)).toBe(true);
  });

  // Note: createArticle and deleteArticle require valid credentials and real data
});
